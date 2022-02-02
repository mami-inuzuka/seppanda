# frozen_string_literal: true

class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :check_invitation_token, only: :create

  private

  def build_resource
    @resource            = resource_class.new(sign_up_params)
    @resource.provider   = provider

    # honor devise configuration for case_insensitive_keys
    if resource_class.case_insensitive_keys.include?(:email)
      @resource.email = sign_up_params[:email].try(:downcase)
    else
      @resource.email = sign_up_params[:email]
    end

    # 以下追記
    invitation_token = request.headers[:InvitationToken]
    if invitation_token.present?
      team = Team.find_by!(invitation_token: invitation_token)
      @resource.team_id = team.id
    else
      @invitation_token = SecureRandom.urlsafe_base64
      @resource.create_team!(invitation_token: @invitation_token)
    end
  end

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
