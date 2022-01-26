# frozen_string_literal: true

class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def create
    super do |resource|
      paring_token = request.headers[:ParingToken]
      if paring_token.present?
        team = Team.find_by(token: paring_token)
        resource.team_id = team.id
      else
        @paring_token = SecureRandom.urlsafe_base64
        resource.create_team!(token: @paring_token)
      end
    end
  end

  private

  def render_create_success
    render json: {
      status: 'success',
      data:   resource_data,
      paring_token: @paring_token
    }
  end

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name, :team_id)
  end
end
