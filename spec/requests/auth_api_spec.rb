# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AuthApi', type: :request do
  describe 'POST api_user_registration_path' do
    subject(:execute_post) { post api_user_registration_path, params: new_user_params, headers: headers }

    context 'without invitation_token' do
      let(:headers) do
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          InvitationToken: ''
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

      it 'creates a new user having a new team with invitation token' do
        expect { execute_post }.to change(User, :count).by(1)
        user = User.find_by(email: 'charlie@example.com')
        expect(user.team.invitation_token).not_to be_nil
      end

      it 'returns json including invitation token' do
        execute_post
        expect(JSON.parse(response.body)['invitation_token']).not_to be_empty
      end
    end

    context 'with invitation_token' do
      let!(:host_user) { create(:host_user) }
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
          'Content-Type': 'application/json',
          Accept: 'application/json',
          InvitationToken: invitation_token
        }
      end

      it 'creates a new user belongs to a team same with host user' do
        expect { execute_post }.to change(User, :count).by(1)
        guest_user = User.find_by(email: 'bob@example.com')
        expect(host_user.team_id).to eq guest_user.team_id
      end

      it 'returns json including empty invitation token' do
        execute_post
        expect(JSON.parse(response.body)['invitation_token']).to be_empty
      end
    end
  end
end
