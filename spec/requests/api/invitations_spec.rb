# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Invitations', type: :request do
  let(:user) { create(:user, :with_team) }
  let(:invitation_token) { Team.find(user.team_id).invitation_token }

  describe 'GET /api/invitations' do
    example '正しいinvitation_tokenの場合招待者情報が返る' do
      get api_invitations_path, headers: { invitationToken: invitation_token }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['name']).to be_present
      expect(JSON.parse(response.body)['avatar']['data']).to be_present
      expect(JSON.parse(response.body)['avatar']['name']).to be_present
    end

    example '不正なinvitation_tokenの場合unprocessable_entityが返る' do
      get api_invitations_path, headers: { invitationToken: '12345' }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
