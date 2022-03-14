# frozen_string_literal: true

class API::ApplicationController < ActionController::API
  include Firebase::Auth::Authenticable
  before_action :authenticate_user
end
