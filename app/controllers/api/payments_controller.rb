# frozen_string_literal: true

class API::PaymentsController < API::ApplicationController
  before_action :set_payment, only: %i[destroy update]

  def index
    @payments = Payment.includes(:user).where(team_id: current_user.team_id,
                                              settled: false).order(paid_at: :desc).order(created_at: :asc).page(params[:page]).per(10)
    @last_page = @payments.last_page?
    @total_pages = @payments.total_pages
    render :index
  end

  def create
    @payment = current_user.payments.build(payment_params.merge({ team_id: current_user.team_id }))
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
    @payment = current_user.team.payments.find(params[:id])
  end
end
