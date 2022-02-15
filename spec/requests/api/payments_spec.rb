# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Payments', type: :request do
  let(:current_user) { create(:user, :with_team) }

  def auth_headers
    post new_api_user_session_path, params: { email: current_user.email, password: current_user.password }
    { 'uid' => response.header['uid'], 'client' => response.header['client'], 'access-token' => response.header['access-token'] }
  end

  def login
    post api_user_session_path,
         params: { email: current_user.email, password: current_user.password }.to_json,
         headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
  end

  describe 'GET /api/payments' do
    before do
      5.times do |n|
        current_user.payments.create(amount: 100 * (n + 1), team_id: current_user.team_id, paid_at: '2022-02-14')
      end
    end

    context 'ログイン中の時' do
      example '登録した支払いの一覧を取得することができる' do
        get api_payments_path, headers: auth_headers
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)[0]['payments'].length).to eq 5
      end
    end

    context 'ログアウト中の時' do
      example '登録した支払いの一覧を取得することができない' do
        get api_payments_path
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'POST /api/payments' do
    let(:params) { { amount: 100, paid_at: '2022-02-14' } }

    context 'ログイン中の時' do
      example '金額を登録することができる' do
        expect { post api_payments_path, params: params, headers: auth_headers }.to change(Payment, :count).by(1)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'ログアウト中の時' do
      example '金額を登録することができない' do
        expect { post api_payments_path, params: params }.not_to change(Payment, :count)
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'DELETE /api/payments/:id' do
    let(:params) { { amount: 100, paid_at: '2022-02-14' } }

    context 'ログイン中の時' do
      example '対象の金額を1つ削除することができる' do
        expect { post api_payments_path, params: params, headers: auth_headers }.to change(Payment, :count).by(1)
        payment = Payment.last
        expect { delete api_payment_path(payment.id), headers: auth_headers }.to change(Payment, :count).by(-1)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'PATCH /api/payments/:id' do
    let(:params) { { amount: 100, paid_at: '2022-02-14' } }
    let(:new_params) { { amount: 500, paid_at: '2022-02-15' } }

    context 'ログイン中の時' do
      example '対象の金額を1つ更新することができる' do
        expect { post api_payments_path, params: params, headers: auth_headers }.to change(Payment, :count).by(1)
        payment = Payment.last
        expect(payment.amount).to eq 100
        expect { patch api_payment_path(payment.id), params: new_params, headers: auth_headers }.to change(Payment, :count).by(0)
        expect(payment.reload.amount).to eq 500
        expect(payment.reload.paid_at.to_s).to eq '2022-02-15'
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
