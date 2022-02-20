# frozen_string_literal: true

class Api::PaymentsController < ApplicationController
  before_action :authenticate_api_user!
  before_action :set_payment, only: %i[destroy update]

  def index
    payments = Payment.includes(:user).where(team_id: current_api_user.team_id, settled: false).order(created_at: :desc)
    @payments_group_by_paid_at = payments.group_by { |payment| payment.paid_at.to_s }.sort.reverse.to_h
    render :index
  end

  def create
    @payment = Payment.new(payment_params)
    @payment.user_id = current_api_user.id
    @payment.team_id = current_api_user.team_id
    if @payment.save!
      render :create
    else
      render json: { status: :unprocessable_entity }
    end
  end

  def destroy
    @payment.destroy!
    render json: { status: :ok }
  end

  def update
    if @payment.update!(payment_params)
      render :update
    else
      render json: { status: :unprocessable_entity }
    end
  end

  private

  def payment_params
    params.permit(:amount, :detail, :paid_at)
  end

  def set_payment
    @payment = Payment.find(params[:id])
  end
end
