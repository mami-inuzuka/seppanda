require 'rails_helper'

RSpec.describe Team, type: :model do
  it "is available when including 2 users" do
    first_user = create(:first_user)
    second_user = build(:second_user)
    second_user.team_id = first_user.team_id
    second_user.save
    expect(Team.enabled?(first_user.team_id)).to be true
  end
end
