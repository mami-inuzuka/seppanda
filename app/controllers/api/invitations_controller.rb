# frozen_string_literal: true

class Api::InvitationsController < Api::ApplicationController
  skip_before_action :authenticate_user

  def index
    team = Team.find_by(invitation_token: request.headers[:invitationToken])
    if team.present?
      @user = team.users.first
      render :index
    else
      render status: :bad_request
    end
  end
end
