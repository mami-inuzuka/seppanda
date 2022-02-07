class Api::PaymentsController < ApplicationController
  before_action :authenticate_api_user!

  def create
    payment = Payment.new(payment_params)
    payment.user_id = current_api_user.id
    payment.team_id = current_api_user.team_id
    if payment.save
      render json: { status: :ok }
    else
      render json: { status: :unprocessable_entity }
    end
  end

  private

  def payment_params
    params.require(:payment).permit(:amount)
  end
end
