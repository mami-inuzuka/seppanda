# frozen_string_literal: true

class Api::FirebaseAuthRailsController < Api::ApplicationController
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
end
