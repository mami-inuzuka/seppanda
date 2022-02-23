# frozen_string_literal: true

class Api::Auth::RegistrationsController < Api::ApplicationController
  skip_before_action :authenticate_user
  before_action :check_invitation_token_and_team_capacity, only: :create
  after_action :attach_default_avatar, only: :create

  def create
    FirebaseIdToken::Certificates.request
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    invitation_token = request.headers[:InvitationToken]
    @user = User.find_or_initialize_by(uid: payload['sub']) do |user|
      user.email = payload['email']
      if invitation_token.present?
        team = Team.find_by!(invitation_token: invitation_token)
        user.team_id = team.id
        user.color = 'orange'
      else
        @invitation_token = SecureRandom.urlsafe_base64
        user.build_team(invitation_token: @invitation_token)
        user.color = 'blue'
      end
    end
    if @user.save
      render :create
    else
      render json: { status: :unprocessable_entity }
    end
  end

  private

  def token_from_request_headers
    request.headers['Authorization']&.split&.last
  end

  def token
    params[:token] || token_from_request_headers
  end

  def payload
    @payload ||= FirebaseIdToken::Signature.verify(token)
  end

  def attach_default_avatar
    @user.avatar.attach(io: File.open('./app/assets/images/default-user-icon.png'), filename: 'default-user-icon.png')
  end

  def check_invitation_token_and_team_capacity
    invitation_token = request.headers[:InvitationToken]
    return if invitation_token.empty?

    if !Team.invitation_token_exists?(invitation_token) || Team.find_by(invitation_token: invitation_token).capacity_reached? # rubocop:disable Style/GuardClause
      render_create_error_token_invalid_or_team_capacity_reached
    end
  end

  def render_create_error_token_invalid_or_team_capacity_reached
    render json: {
      status: 'error',
      errors: {
        fullMessages: [I18n.t('devise_token_auth.registrations.token_invalid_or_team_capacity_reached')]
      }
    }, status: :unprocessable_entity
  end
end
