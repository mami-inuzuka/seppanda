# frozen_string_literal: true

class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def create
    build_resource
    @resource.create_team(token: SecureRandom.urlsafe_base64)
    team = @resource.team
    @resource.team = team

    unless @resource.present?
      raise DeviseTokenAuth::Errors::NoResourceDefinedError,
            "#{self.class.name} #build_resource does not define @resource,"\
            ' execution stopped.'
    end

    # give redirect value from params priority
    @redirect_url = params.fetch(
      :confirm_success_url,
      DeviseTokenAuth.default_confirm_success_url
    )

    # success redirect url is required
    if confirmable_enabled? && !@redirect_url
      return render_create_error_missing_confirm_success_url
    end

    # if whitelist is set, validate redirect_url against whitelist
    return render_create_error_redirect_url_not_allowed if blacklisted_redirect_url?(@redirect_url)

    # override email confirmation, must be sent manually from ctrl
    callback_name = defined?(ActiveRecord) && resource_class < ActiveRecord::Base ? :commit : :create
    resource_class.set_callback(callback_name, :after, :send_on_create_confirmation_instructions)
    resource_class.skip_callback(callback_name, :after, :send_on_create_confirmation_instructions)

    if @resource.respond_to? :skip_confirmation_notification!
      # Fix duplicate e-mails by disabling Devise confirmation e-mail
      @resource.skip_confirmation_notification!
    end

    if @resource.save
      yield @resource if block_given?

      unless @resource.confirmed?
        # user will require email authentication
        @resource.send_confirmation_instructions({
          client_config: params[:config_name],
          redirect_url: @redirect_url
        })
      end

      if active_for_authentication?
        # email auth has been bypassed, authenticate user
        @token = @resource.create_token
        @resource.save!
        update_auth_header
      end

      render_create_success
    else
      clean_up_passwords @resource
      render_create_error
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
  end

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name, :team_id)
  end
end
