# frozen_string_literal: true

class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :check_invitation_token, only: :create

  def create
    invitation_token = request.headers[:InvitationToken]
    super do |resource|
      if invitation_token.present?
        team = Team.find_by!(invitation_token: invitation_token)
        resource.team_id = team.id
      else
        @invitation_token = SecureRandom.urlsafe_base64
        resource.create_team!(invitation_token: @invitation_token)
      end
    end
  end

  private

  def render_create_success
    if Team.enabled?(resource_data["team_id"])
      render json: {
        is_team_enabled: true,
        data:   resource_data,
        invitation_token: ''
      }
    else
      render json: {
        is_team_enabled: false,
        data:   resource_data,
        invitation_token: @invitation_token
      }
    end
  end

  def check_invitation_token
    invitation_token = request.headers[:InvitationToken]
    return if invitation_token.empty?
    render_create_error_token_invalid if !Team.invitation_token_valid?(invitation_token)
  end

  def render_create_error_token_invalid
    render json: {
      status: 'error',
      data:   resource_data,
      errors: {
        fullMessages: [I18n.t('devise_token_auth.registrations.token_invalid')]
      }
    }, status: 422
  end

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name, :team_id)
  end
end
