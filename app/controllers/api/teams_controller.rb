class Api::TeamsController < ApplicationController
  before_action :authenticate_api_user!

  def show
    team = Team.find(current_api_user.team_id)
    render json: {
      refund_amount: team.refund_amount,
      largest_payment_user: team.largest_payment_user,
      smallest_payment_user: team.smallest_payment_user
    }
  end
end
