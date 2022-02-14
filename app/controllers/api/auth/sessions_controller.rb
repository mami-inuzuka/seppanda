# frozen_string_literal: true

class Api::Auth::SessionsController < ApplicationController
  def index
    @current_api_user = current_api_user
    render :index
  end
end
