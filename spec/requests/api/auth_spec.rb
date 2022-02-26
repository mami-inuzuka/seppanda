# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AuthApi', type: :request do
  describe 'POST /api/auth/registrations' do
    let(:params) { { token: 'token' }.to_json }
    let!(:host_user) { create(:user, :with_team) }
    let(:team) { Team.find(host_user.team_id) }

    before do
      stub_authenticate_new_user
    end

    context 'サインアップURLにinvitation_tokenが含まれない時' do
      let(:headers) do
        {
          'Content-Type' => 'application/json',
          'Accept' => 'application/json',
          'InvitationToken' => ''
        }
      end

      example 'ユーザーに紐づくteamが新しく作られ、レスポンスにそのteamのinvitation_tokenが含まれる' do
        expect { post api_users_path, params: params, headers: headers }.to change(User, :count).by(1).and change(Team, :count).by(1)
        team = Team.last
        user = User.last
        expect(user.team_id).to eq team.id
        expect(user.team.invitation_token).to be_present
        expect(JSON.parse(response.body)['invitation_token']).to be_present
        expect(JSON.parse(response.body)['invitation_token']).to eq user.team.invitation_token
      end
    end

    context 'サインアップURLにinvitation_tokenが含まれる時' do
      let(:headers) do
        {
          'Content-Type' => 'application/json',
          'Accept' => 'application/json',
          'InvitationToken' => host_user.team.invitation_token
        }
      end

      example '新しいteamは作られず招待した人と同じteamに所属する' do
        expect { post api_users_path, params: params, headers: headers }.to change(User, :count).by(1).and change(Team, :count).by(0)
        guest_user = User.last
        expect(guest_user.team_id).to eq host_user.team_id
        expect(team.capacity_reached?).to eq true
      end

      example '存在しないinvitation_tokenの場合登録できない' do
        expect do
          post api_users_path, params: params, headers: {
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'InvitationToken' => '123456789'
          }
        end.to change(User, :count).by(0).and change(Team, :count).by(0)
        expect(JSON.parse(response.body)['errors']['fullMessages']).to include('Your token is invalid or the team reached capacity')
      end

      example 'teamに既に2人のユーザーが所属していたら登録できない' do
        create(:user, team_id: host_user.team_id)
        expect { post api_users_path, params: params, headers: headers }.to change(User, :count).by(0).and change(Team, :count).by(0)
        expect(JSON.parse(response.body)['errors']['fullMessages']).to include('Your token is invalid or the team reached capacity')
      end
    end
  end
end
