# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'API::Payments', type: :request do
  let(:current_user) { create(:user, :with_team) }
  let(:other_user) { create(:user, team_id: current_user.team_id) }
  let(:team) { current_user.team }
  let(:headers) { { Authorization: 'Bearer token' } }
  let(:other_team_user) { create(:user, :with_team) }

  # 精算済みのデータが4件、未精算のデータが12件ある
  before do
    2.times do
      current_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
      other_user.payments.create(amount: 500, detail: 'カフェ', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
    end
    2.times do
      current_user.payments.create(amount: 800, detail: 'スーパー', team_id: team.id, paid_at: '2022-02-25')
      other_user.payments.create(amount: 500, detail: '日用品', team_id: team.id, paid_at: '2022-02-25')
    end
    2.times do
      current_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-03-01')
      other_user.payments.create(amount: 500, detail: 'カフェ', team_id: team.id, paid_at: '2022-03-01')
    end
    2.times do
      current_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-03-02')
      other_user.payments.create(amount: 500, detail: 'カフェ', team_id: team.id, paid_at: '2022-03-02')
    end
  end

  context 'ログイン中の時' do
    before do
      stub_firebase(current_user)
    end

    describe 'GET /api/payments' do
      example 'ページの合計数が返ってくる' do
        get api_payments_path, params: { page: 1 }, headers: headers
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['total_pages']).to eq 2
      end

      context '?page=1' do
        example '未清算の支払い一覧の最初の10件が返ってくる' do
          get api_payments_path, params: { page: 1 }, headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)['payments'].length).to eq 10
        end

        example '最後のページではない' do
          get api_payments_path, params: { page: 1 }, headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)['is_last_page']).to be false
        end
      end

      context '?page=2' do
        example '未清算の支払い一覧のうち最後の2件が返ってくる' do
          get api_payments_path, params: { page: 2 }, headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)['payments'].length).to eq 2
        end

        example '最後のページである' do
          get api_payments_path, params: { page: 2 }, headers: headers
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)['is_last_page']).to be true
        end
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
      example '自分が登録した支払い情報を削除することができる' do
        payment = Payment.last
        expect { delete api_payment_path(payment.id), headers: headers }.to change(Payment, :count).by(-1)
        expect(response).to have_http_status(:ok)
      end

      example '同じチームに所属する相手が登録した支払い情報を削除することができる' do
        other_user.payments.create(amount: 1000, detail: '日用品', team_id: other_user.team.id, paid_at: '2022-02-25')
        payment = Payment.last
        expect(payment.user).to eq other_user
        expect { delete api_payment_path(payment.id), headers: headers }.to change(Payment, :count).by(-1)
        expect(response).to have_http_status(:ok)
      end

      example '自分が所属しているチーム以外の支払い情報は削除することができない' do
        other_team_user.payments.create(amount: 1000, detail: '日用品', team_id: other_team_user.team.id, paid_at: '2022-02-25')
        payment = Payment.last
        expect(payment.user).to eq other_team_user
        expect { delete api_payment_path(payment.id), headers: headers }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    describe 'PATCH /api/payments/:id' do
      let(:params) { { amount: 100, detail: 'スーパー', paid_at: '2022-02-14' } }
      let(:new_params) { { amount: 500, detail: '日用品', paid_at: '2022-02-15' } }

      example '自分が登録した支払い情報を更新することができる' do
        expect { post api_payments_path, params: params, headers: headers }.to change(Payment, :count).by(1)
        payment = Payment.last
        expect(payment.user).to eq current_user
        expect(payment.amount).to eq 100
        expect { patch api_payment_path(payment.id), params: new_params, headers: headers }.to change(Payment, :count).by(0)
        expect(payment.reload.amount).to eq 500
        expect(payment.reload.paid_at.to_s).to eq '2022-02-15'
        expect(payment.reload.detail).to eq '日用品'
        expect(response).to have_http_status(:ok)
      end

      example '同じチームに所属する相手が登録した支払い情報を更新することができる' do
        other_user.payments.create(amount: 1000, detail: '日用品', team_id: other_user.team.id, paid_at: '2022-02-25')
        payment = Payment.last
        expect(payment.user).to eq other_user
        expect(payment.amount).to eq 1000
        expect { patch api_payment_path(payment.id), params: new_params, headers: headers }.to change(Payment, :count).by(0)
        expect(payment.reload.amount).to eq 500
        expect(payment.reload.paid_at.to_s).to eq '2022-02-15'
        expect(payment.reload.detail).to eq '日用品'
        expect(response).to have_http_status(:ok)
      end

      example '自分が所属しているチーム以外の支払い情報は更新することができない' do
        other_team_user.payments.create(amount: 1000, detail: '日用品', team_id: other_team_user.team.id, paid_at: '2022-02-25')
        payment = Payment.last
        expect(payment.user).to eq other_team_user
        expect { patch api_payment_path(payment.id), params: new_params, headers: headers }.to raise_error(ActiveRecord::RecordNotFound)
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
