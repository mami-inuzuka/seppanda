# frozen_string_literal: true

class Api::Teams::PaymentsController < Api::ApplicationController
  def update
    payments = Payment.includes(:user).where(team_id: current_user.team_id, settled: false)
    payments.update_all(settled: true, settled_at: Time.zone.now) # rubocop:disable Rails/SkipsModelValidations
    render json: { status: :ok }
  end
end
