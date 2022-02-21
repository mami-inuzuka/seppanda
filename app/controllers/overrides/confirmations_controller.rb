# frozen_string_literal: true

class Overrides::ConfirmationsController < DeviseTokenAuth::ConfirmationsController
  def show
    @resource = resource_class.confirm_by_token(resource_params[:confirmation_token])
    if @resource.errors.empty?
      yield @resource if block_given?
      invitation_token = Team.find(@resource.team_id).invitation_token # 追記
      redirect_header_options = { account_confirmation_success: true, invitation_token: invitation_token } # 追記

      if signed_in?(resource_name)
        token = signed_in_resource.create_token
        signed_in_resource.save!

        invitation_token = Team.find(@resource.team_id).invitation_token

        redirect_headers = build_redirect_headers(token.token,
                                                  token.client,
                                                  redirect_header_options)
        redirect_to_link = signed_in_resource.build_auth_url(redirect_url, redirect_headers)
      else
        redirect_to_link = DeviseTokenAuth::Url.generate(redirect_url, redirect_header_options)
    end
      redirect_to(redirect_to_link)
    else
      raise ActionController::RoutingError, 'Not Found'
    end
  end
end
