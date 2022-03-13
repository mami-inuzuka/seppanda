# frozen_string_literal: true

module InvitationTokenAndTeamCapacityCheckable
  extend ActiveSupport::Concern

  def check_invitation_token_and_team_capacity
    invitation_token = request.headers[:InvitationToken]
    return if invitation_token.empty?

    if !Team.invitation_token_exists?(invitation_token) || Team.find_by(invitation_token: invitation_token).capacity_reached? # rubocop:disable Style/GuardClause
      render_create_error_token_invalid_or_team_capacity_reached
    end
  end

  def render_create_error_token_invalid_or_team_capacity_reached
    render json: {
      status: 'error',
      errors: {
        fullMessages: 'invitation_tokenが不正かチームの定員が上限に達しています'
      }
    }, status: :unprocessable_entity
  end
end
