# frozen_string_literal: true

class ApplicationController < ActionController::API
        include ActionController::Helpers
        include DeviseTokenAuth::Concerns::SetUserByToken

        skip_before_action :verify_authenticity_token, raise: false
        helper_method :current_user, :user_signed_in?
end
