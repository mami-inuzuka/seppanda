# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'API::Teams', type: :request do
  let(:current_user) { create(:user, :with_team) }
  let(:other_user) { create(:user, team_id: current_user.team_id) }
  let(:team) { Team.find(current_user.team_id) }
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

    describe 'GET /api/teams/:id' do
      example 'チームの状況を取得することができる' do
        get api_team_path(current_user.team_id), headers: headers
        json = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(json['is_team_capacity_reached']).to eq(team.capacity_reached?)
        expect(json['refund_amount']).to eq(team.refund_amount)
        expect(json['largest_payment_user']['id']).to eq(team.largest_payment_user.id)
        expect(json['smallest_payment_user']['id']).to eq(team.smallest_payment_user.id)
      end
    end
  end

  context 'ログアウト中の時' do
    example 'チームの状況を取得することができない' do
      get api_team_path(current_user.team_id)
      expect(response.status).to eq(401)
    end
  end
end
