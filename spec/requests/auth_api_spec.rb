# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AuthApi', type: :request do
  describe 'POST api_user_registration_path' do
    subject(:execute_post) { post api_user_registration_path, params: new_user_params, headers: headers }

    context 'サインアップURLにinvitation_tokenが含まれない時' do
      let(:headers) do
        {
          'Content-Type' => 'application/json',
          'Accept' => 'application/json',
          'InvitationToken' => ''
        }
      end
      let(:new_user_params) do
        {
          name: 'charlie',
          email: 'charlie@example.com',
          password: 'testtest',
          password_confirmation: 'testtest'
        }.to_json
      end

      example 'teamが新しく作られ、そのteamに所属するユーザーが作成される' do
        expect { execute_post }.to change(User, :count).by(1)
        user = User.find_by(email: 'charlie@example.com')
        expect(user.team.invitation_token).to be_present
      end

      example 'レスポンスにinvitation tokenが含まれる' do
        execute_post
        expect(JSON.parse(response.body)['invitation_token']).to be_present
      end
    end

    context 'サインアップURLにinvitation_tokenが含まれる時' do
      let!(:host_user) { create(:user, :with_team) }
      let!(:invitation_token) { host_user.team.invitation_token }
      let(:new_user_params) do
        {
          name: 'bob',
          email: 'bob@example.com',
          password: 'testtest',
          password_confirmation: 'testtest'
        }.to_json
      end
      let(:headers) do
        {
          'Content-Type' => 'application/json',
          'Accept' => 'application/json',
          'InvitationToken' => invitation_token
        }
      end

      example '招待した人と同じteamに所属するユーザーが作られる' do
        expect { execute_post }.to change(User, :count).by(1)
        guest_user = User.find_by(email: 'bob@example.com')
        expect(host_user.team_id).to eq guest_user.team_id
      end

      example 'レスポンスにinvitation tokenが含まれない' do
        execute_post
        expect(JSON.parse(response.body)['invitation_token']).to be_empty
      end
    end
  end
end
