# frozen_string_literal: true

class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :check_invitation_token_and_team_capacity, only: :create

  def update
    if @resource
      if params[:avatar]
        blob = ActiveStorage::Blob.create_and_upload!(
          io: StringIO.new(decode(params[:avatar][:data]) + "\n"),
          filename: params[:avatar][:name]
        )
        @resource.avatar.attach(blob)
      end
      if @resource.send(resource_update_method, account_update_params)
        yield @resource if block_given?
        render_update_success
      else
        render_update_error
      end
    else
      render_update_error_user_not_found
    end
  end

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
    if @resource.team.capacity_reached?
      render json: {
        is_team_capacity_reached: true,
        data:   resource_data,
        invitation_token: ''
      }
    else
      render json: {
        is_team_capacity_reached: false,
        data:   resource_data,
        invitation_token: @invitation_token
      }
    end
  end

  def check_invitation_token_and_team_capacity
    invitation_token = request.headers[:InvitationToken]
    return if invitation_token.empty?
    render_create_error_token_invalid_or_team_capacity_reached if !Team.invitation_token_exists?(invitation_token) || Team.find_by(invitation_token: invitation_token).capacity_reached?
  end

  def render_create_error_token_invalid_or_team_capacity_reached
    render json: {
      status: 'error',
      data:   resource_data,
      errors: {
        fullMessages: [I18n.t('devise_token_auth.registrations.token_invalid_or_team_capacity_reached')]
      }
    }, status: 422
  end

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name, :team_id)
  end

  def account_update_params
    params.permit(:email, :name, :avatar)
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end
end
