# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Teams', type: :request do
  let!(:current_user) { create(:user, :with_team) }
  let!(:other_user) { create(:user, team_id: current_user.team_id) }
  let!(:team) { Team.find(current_user.team_id) }

  def auth_headers
    post new_api_user_session_path, params: { email: current_user.email, password: current_user.password }
    { 'uid' => response.header['uid'], 'client' => response.header['client'], 'access-token' => response.header['access-token'] }
  end

  def login
    post api_user_session_path,
         params: { email: current_user.email, password: current_user.password }.to_json,
         headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
  end

  describe 'GET /api/teams/:id' do
    example 'チームの状況を取得することができる' do
      5.times do |n|
        current_user.payments.create(amount: 100 * (n + 1), team_id: current_user.team_id)
      end # 1500
      get api_team_path(current_user.team_id), headers: auth_headers
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(
        {
          refund_amount: team.refund_amount,
          largest_payment_user: team.largest_payment_user,
          smallest_payment_user: team.smallest_payment_user,
          is_team_capacity_reached: team.capacity_reached?,
        }.to_json
      )
    end
  end
end
