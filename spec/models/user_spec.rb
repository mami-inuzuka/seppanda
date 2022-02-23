# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  example 'メールアドレスが重複していたら登録できない' do
    create(:user, :with_team, email: 'alice@example.com')
    user = build(:user, :with_team, email: 'alice@example.com')
    user.valid?
    expect(user).to be_invalid
    expect(user.errors[:email]).to include('has already been taken')
  end
end
