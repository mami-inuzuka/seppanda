# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Payments', type: :request do
  let(:current_user) { create(:user, :with_team) }
  let(:other_user) { create(:user, team_id: current_user.team_id) }
  let(:team) { current_user.team }

  def auth_headers
    post new_api_user_session_path, params: { email: current_user.email, password: current_user.password }
    { 'uid' => response.header['uid'], 'client' => response.header['client'], 'access-token' => response.header['access-token'] }
  end

  def login
    post api_user_session_path,
        params: { email: current_user.email, password: current_user.password }.to_json,
        headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
  end

  before do
    current_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
    other_user.payments.create(amount: 500, detail: 'カフェ', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
    current_user.payments.create(amount: 800, detail: 'スーパー', team_id: team.id, paid_at: '2022-02-25')
    other_user.payments.create(amount: 500, detail: '日用品', team_id: team.id, paid_at: '2022-02-25')
  end

  describe 'GET /api/payments' do
    context 'ログイン中の時' do
      example '未清算の支払い一覧を取得することができる' do
        get api_payments_path, headers: auth_headers
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)[0]['payments'].length).to eq 2
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
    context 'ログイン中の時' do
      example '対象の金額を1つ削除することができる' do
        payment = Payment.last
        expect { delete api_payment_path(payment.id), headers: auth_headers }.to change(Payment, :count).by(-1)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'PATCH /api/payments/:id' do
    let(:params) { { amount: 100, detail: 'スーパー', paid_at: '2022-02-14' } }
    let(:new_params) { { amount: 500, detail: '日用品', paid_at: '2022-02-15' } }

    context 'ログイン中の時' do
      example '対象の金額を1つ更新することができる' do
        expect { post api_payments_path, params: params, headers: auth_headers }.to change(Payment, :count).by(1)
        payment = Payment.last
        expect(payment.amount).to eq 100
        expect { patch api_payment_path(payment.id), params: new_params, headers: auth_headers }.to change(Payment, :count).by(0)
        expect(payment.reload.amount).to eq 500
        expect(payment.reload.paid_at.to_s).to eq '2022-02-15'
        expect(payment.reload.detail).to eq '日用品'
        expect(response).to have_http_status(:ok)
      end
    end
  end

  # 精算機能
  describe 'PATCH /api/teams/:team_id/payments' do
    example '精算を実行するとPaymentのsettledカラムが全てtrueになる' do
      expect { patch api_team_payments_path(team), params: '', headers: auth_headers }.not_to change(Payment, :count)
      team.payments.each do |payment|
        expect(payment.settled).to eq true
      end
    end
  end
end
