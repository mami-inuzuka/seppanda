# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'API::Payments', type: :request do
  let(:current_user) { create(:user, :with_team) }
  let(:other_user) { create(:user, team_id: current_user.team_id) }
  let(:team) { current_user.team }
  let(:headers) { { Authorization: 'Bearer token' } }

  before do
    current_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
    other_user.payments.create(amount: 500, detail: 'カフェ', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
    current_user.payments.create(amount: 800, detail: 'スーパー', team_id: team.id, paid_at: '2022-02-25')
    other_user.payments.create(amount: 500, detail: '日用品', team_id: team.id, paid_at: '2022-02-25')
  end

  context 'ログイン中の時' do
    before do
      stub_firebase(current_user)
    end

    describe 'GET /api/payments' do
      example '未清算の支払い一覧を取得することができる' do
        get api_payments_path, headers: headers
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)[0]['payments'].length).to eq 2
      end
    end

    describe 'POST /api/payments' do
      example 'amount/detail/paid_atが記入されていると支払い情報を登録することができる' do
        expect do
          post api_payments_path, params: { amount: 100, detail: 'スーパー', paid_at: '2022-02-14' }, headers: headers
        end.to change(Payment, :count).by(1)
        expect(response).to have_http_status(:ok)
      end

      example 'detailは空でも支払い情報を登録することができる' do
        expect { post api_payments_path, params: { amount: 100, paid_at: '2022-02-14' }, headers: headers }.to change(Payment, :count).by(1)
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'DELETE /api/payments/:id' do
      example '対象の支払い情報を1つ削除することができる' do
        payment = Payment.last
        expect { delete api_payment_path(payment.id), headers: headers }.to change(Payment, :count).by(-1)
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'PATCH /api/payments/:id' do
      let(:params) { { amount: 100, detail: 'スーパー', paid_at: '2022-02-14' } }
      let(:new_params) { { amount: 500, detail: '日用品', paid_at: '2022-02-15' } }

      example '対象の支払い情報を1つ更新することができる' do
        expect { post api_payments_path, params: params, headers: headers }.to change(Payment, :count).by(1)
        payment = Payment.last
        expect(payment.amount).to eq 100
        expect { patch api_payment_path(payment.id), params: new_params, headers: headers }.to change(Payment, :count).by(0)
        expect(payment.reload.amount).to eq 500
        expect(payment.reload.paid_at.to_s).to eq '2022-02-15'
        expect(payment.reload.detail).to eq '日用品'
        expect(response).to have_http_status(:ok)
      end
    end

    describe 'PATCH /api/teams/:team_id/payments' do
      example '精算を実行するとPaymentのsettledカラムが全てtrueになる' do
        expect { patch api_team_payments_path(team), params: '', headers: headers }.not_to change(Payment, :count)
        team.payments.each do |payment|
          expect(payment.settled).to eq true
        end
      end
    end
  end

  context 'ログアウト中の時' do
    example '登録した支払い情報の一覧を取得することができない' do
      get api_payments_path
      expect(response.status).to eq(401)
    end

    example '支払い情報を登録することができない' do
      expect { post api_payments_path, params: { amount: 100, detail: 'スーパー', paid_at: '2022-02-14' } }.not_to change(Payment, :count)
      expect(response.status).to eq(401)
    end

    example '支払い情報を削除することができない' do
      payment = Payment.last
      expect { delete api_payment_path(payment.id), headers: headers }.not_to change(Payment, :count)
      expect(response.status).to eq(401)
    end

    example '支払い情報を更新することができない' do
      payment = current_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
      expect { patch api_payment_path(payment.id), params: { amount: 100, detail: 'スーパー', paid_at: '2022-02-15' } }.to change(Payment, :count).by(0)
      expect(response.status).to eq(401)
    end

    example '精算を実行することができない' do
      expect { patch api_team_payments_path(team), params: '', headers: headers }.not_to change(Payment, :count)
      team.payments.unsettled.each do |payment|
        expect(payment.settled).to eq false
      end
      expect(response.status).to eq(401)
    end
  end
end
