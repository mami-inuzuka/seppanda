# frozen_string_literal: true

class Api::PaymentsController < ApplicationController
  before_action :authenticate_api_user!
  before_action :set_payment, only: %i[destroy]

  def index
    payments = Payment.includes(:user).where(team_id: current_api_user.team_id).order(created_at: :desc)
    render json: payments, include: [:user]
  end

  def create
    payment = Payment.new(payment_params)
    payment.user_id = current_api_user.id
    payment.team_id = current_api_user.team_id
    if payment.save!
      render json: payment, include: [:user]
    else
      render json: { status: :unprocessable_entity }
    end
  end

  def destroy
    @payment.destroy!
    render json: { status: :ok }
  end

  private

  def payment_params
    params.permit(:amount)
  end

  def set_payment
    @payment = Payment.find(params[:id])
  end
end
