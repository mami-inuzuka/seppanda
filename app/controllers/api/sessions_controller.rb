# frozen_string_literal: true

class Api::SessionsController < Api::FirebaseAuthRailsController
  skip_before_action :authenticate_user

  def index
    @user = User.find_by(uid: payload['sub'])
    render :index
  end
end
