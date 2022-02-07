require 'rails_helper'

RSpec.describe "Api::Payments", type: :request do
  describe 'POST /api/payments' do
    let(:current_user) { create(:user, :with_team) }

    def auth_headers
      post new_api_user_session_path, params: { email:current_user.email, password: current_user.password }
      { 'uid'=>response.header['uid'], 'client'=>response.header['client'], 'access-token'=>response.header['access-token'] }
    end

    context 'ログイン中の時' do
      example '登録した支払いの一覧を取得することができる' do
        5.times do |n|
          payment = Payment.new(amount: 100 * (n+1))
          payment.user_id = current_user.id
          payment.team_id = current_user.team_id
          payment.save
        end
        get api_payments_path, headers: auth_headers
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['payments'].length).to eq 5
      end

      example '金額を登録することができる' do
        params = { amount: 100 }
        expect { post api_payments_path, params: params, headers: auth_headers }.to change(Payment, :count).by(1)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'ログアウト中の時' do
      example '登録した支払いの一覧を取得することができない' do
        5.times do |n|
          payment = Payment.new(amount: 100 * (n+1))
          payment.user_id = current_user.id
          payment.team_id = current_user.team_id
          payment.save
        end
        get api_payments_path
        expect(response.status).to eq(401)
      end

      example '金額を登録することができない' do
        params = { amount: 100 }
        expect { post api_payments_path, params: params }.not_to change(Payment, :count)
        expect(response.status).to eq(401)
      end
    end



    # context '異常系' do
    #   example '8桁以上の金額は登録できない' do

    #   end

    #   example '0円は登録できない' do

    #   end

    #   example '空文字は登録できない' do

    #   end
    # end

    def login
      post api_user_session_path, params: { email: @current_user.email, password: @current_user.password }.to_json, headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
    end
  end
end
