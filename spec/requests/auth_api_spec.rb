# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AuthApi', type: :request do
  describe 'POST api_user_registration_path' do
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

      context '正常系' do
        example 'ユーザーに紐づくteamが新しく作られ、レスポンスにそのteamのinvitation_tokenが含まれる' do
          expect { post api_user_registration_path, params: new_user_params, headers: headers }.to change(User, :count).by(1).and change(Team, :count).by(1)
          team = Team.last
          user = User.last
          expect(user.email).to eq 'charlie@example.com'
          expect(user.team_id).to eq team.id
          expect(user.team.invitation_token).to be_present
          expect(JSON.parse(response.body)['invitation_token']).to be_present
          expect(JSON.parse(response.body)['invitation_token']).to eq user.team.invitation_token
        end
      end
    end

    context 'サインアップURLにinvitation_tokenが含まれる時' do
      let!(:host_user) { create(:user, :with_team) }
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
          'InvitationToken' => host_user.team.invitation_token
        }
      end

      context '正常系' do
        example '新しいteamは作られず招待した人と同じteamに所属し、レスポンスにinvitation_tokenは含まれない' do
          expect { post api_user_registration_path, params: new_user_params, headers: headers }.to change(User, :count).by(1).and change(Team, :count).by(0)
          guest_user = User.last
          expect(guest_user.email).to eq 'bob@example.com'
          expect(guest_user.team_id).to eq host_user.team_id
          expect(JSON.parse(response.body)['invitation_token']).to be_empty
        end
      end

      context '異常系' do
        example '存在しないinvitation_tokenの場合登録できない' do
          expect do
            post api_user_registration_path, params: new_user_params, headers: {
              'Content-Type' => 'application/json',
              'Accept' => 'application/json',
              'InvitationToken' => '123456789'
            }
          end.to change(User, :count).by(0).and change(Team, :count).by(0)
          expect(JSON.parse(response.body)['errors']['fullMessages']).to include('Your token is invalid or the team reached capacity')
        end

        example 'teamに既に2人のユーザーが所属していたら登録できない' do
          guest_user = build(:user)
          guest_user.team_id = host_user.team_id
          guest_user.save
          expect { post api_user_registration_path, params: new_user_params, headers: headers }.to change(User, :count).by(0).and change(Team, :count).by(0)
          expect(JSON.parse(response.body)['errors']['fullMessages']).to include('Your token is invalid or the team reached capacity')
        end
      end
    end
  end
end
