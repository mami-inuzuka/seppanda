# frozen_string_literal: true

class Api::PaymentsController < Api::ApplicationController
  before_action :set_payment, only: %i[destroy update]

  def index
    payments = Payment.includes(:user).where(team_id: current_user.team_id, settled: false).order(created_at: :desc)
    @payments_group_by_paid_at = payments.group_by { |payment| payment.paid_at.to_s }.sort.reverse.to_h
    render :index
  end

  def create
    @payment = current_user.payments.build(payment_params.merge({team_id: current_user.team_id }))
    if @payment.save
      render :create
    else
      render json: { messages: @payment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @payment.destroy!
    render json: { status: :ok }
  end

  def update
    if @payment.update(payment_params)
      render :update
    else
      render json: { messages: @payment.errors.full_messages }, status: :unprocessable_entity
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
