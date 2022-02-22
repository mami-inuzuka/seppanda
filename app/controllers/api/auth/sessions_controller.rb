# frozen_string_literal: true

class Api::Auth::SessionsController < ApplicationController
  skip_before_action :authenticate_user

  def index
    @user = User.find_by(uid: params[:uid])
    render :index
  end
end
