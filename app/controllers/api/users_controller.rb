# frozen_string_literal: true

class Api::UsersController < Api::Auth::FirebaseAuthRailsController
  skip_before_action :authenticate_user
  before_action :check_invitation_token_and_team_capacity, only: :create

  def create # rubocop:disable Metrics/MethodLength
    FirebaseIdToken::Certificates.request
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    @user = User.new(uid: payload['sub'], name: params[:name])
    invitation_token = request.headers[:InvitationToken]
    if invitation_token.present?
      team = Team.find_by!(invitation_token: invitation_token)
      @user.team_id = team.id
      @user.color = 'orange'
    else
      @invitation_token = SecureRandom.urlsafe_base64
      @user.build_team(invitation_token: @invitation_token)
      @user.color = 'blue'
    end

    attach_avatar

    if @user.save
      render :create
    else
      render json: { status: :unprocessable_entity }
    end
  end

  def update
    @user = User.find_by(uid: payload['sub'])
    @user.name = params[:name]
    if params[:avatar][:data].present?
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("#{decode(params[:avatar][:data])}\n"),
        filename: params[:avatar][:name]
      )
      @user.avatar.attach(blob)
    end
    if @user.update(update_params)
      render :update
    else
      render json: { status: :unprocessable_entity }
    end
  end

  private

  def attach_avatar
    if params[:avatar][:data].present?
      io = StringIO.new("#{decode(params[:avatar][:data])}\n")
      filename = params[:avatar][:name]
    else
      io = File.open('./app/assets/images/default-user-icon.png')
      filename = 'default-user-icon.png'
    end
    blob = ActiveStorage::Blob.create_and_upload!(io: io, filename: filename)
    @user.avatar.attach(blob)
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

  def decode(str)
    Base64.decode64(str.split(',').last)
  end

  def update_params
    params.permit(:name)
  end
end
