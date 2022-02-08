class Api::PaymentsController < ApplicationController
  before_action :authenticate_api_user!

  def index
    payments = Payment.where(team_id: current_api_user.team_id).order(created_at: :desc)
    render json: { status: :ok, payments: payments }
  end

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
    params.permit(:amount)
  end
end
