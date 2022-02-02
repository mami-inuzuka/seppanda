require 'rails_helper'

RSpec.describe "AuthApi", type: :request do
  describe "POST api_user_registration_path" do
    context "without invitation_token" do
      it "creates a new user having a new team with invitation token" do
        headers = {
          'Content-Type'=>'application/json',
          'Accept'=> 'application/json',
          'InvitationToken'=> ''
        }
        expect {
          post api_user_registration_path, params: {
            name: 'charlie',
            email: 'charlie@example.com',
            password: 'testtest',
            password_confirmation: 'testtest'
          }.to_json, headers: headers
        }.to change(User, :count).by(1)
        user = User.find_by(email: 'charlie@example.com')
        expect(user.team.invitation_token).not_to be_nil
      end
    end

    context "with invitation_token" do
      it 'creates a new user belongs to a team same with invitee' do
        first_user = create(:first_user)
        invitation_token = first_user.team.invitation_token
        headers = {
          'Content-Type'=>'application/json',
          'Accept'=> 'application/json',
          'InvitationToken'=> invitation_token
        }
        expect {
          post api_user_registration_path, params: {
            name: 'bob',
            email: 'bob@example.com',
            password: 'testtest',
            password_confirmation: 'testtest'
          }.to_json, headers: headers
        }.to change(User, :count).by(1)
        second_user = User.find_by(email: 'bob@example.com')
        expect(first_user.team_id).to eq second_user.team_id
      end
    end
  end
end
