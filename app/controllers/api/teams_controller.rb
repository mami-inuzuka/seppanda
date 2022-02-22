# frozen_string_literal: true

class Api::TeamsController < ApplicationController
  def show
    @team = Team.find(current_user.team_id)
    render :show
  end
end
