# frozen_string_literal: true

class Api::Teams::PaymentsController < Api::ApplicationController
  def update
    payments = Payment.includes(:user).where(team_id: current_user.team_id, settled: false)
    if payments.present?
      payments.update_all(settled: true, settled_at: Time.zone.now) # rubocop:disable Rails/SkipsModelValidations
    else
      render json: { message: '支払情報がないため精算処理を実行できません' }, status: :unprocessable_entity
    end
  end
end
