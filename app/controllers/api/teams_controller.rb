# frozen_string_literal: true

class Api::TeamsController < ApplicationController
  before_action :authenticate_api_user!

  def show
    @team = Team.find(current_api_user.team_id)
    render :show
  end
end
