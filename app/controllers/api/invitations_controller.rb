# frozen_string_literal: true

class Api::InvitationsController < Api::ApplicationController
  skip_before_action :authenticate_user

  def index
    team = Team.find_by(invitation_token: request.headers[:invitationToken])
    if team.present? && !team.capacity_reached?
      @user = team.users.first
      render :index
    else
      render json: { message: '不正な招待URLです' }, status: :unprocessable_entity
    end
  end
end
