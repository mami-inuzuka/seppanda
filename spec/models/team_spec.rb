# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Team, type: :model do
  example '1つのteamに含まれるユーザーが2人の時満員となる' do
    host_user = create(:user, :with_team)
    guest_user = build(:user)
    guest_user.team_id = host_user.team_id
    guest_user.save
    expect(host_user.team.capacity_reached?).to be true
  end
end
