# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  context 'email' do
    example '重複していたら登録できない' do
      create(:user, :with_team, email: 'alice@example.com', name: 'Alice')
      user = build(:user, :with_team, email: 'alice@example.com')
      user.valid?
      expect(user).to be_invalid
      expect(user.errors[:email]).to include('has already been taken')
    end
  end

  context 'name' do
    example '空では登録できない' do
      user = build(:user, :with_team, email: 'bob@example.com', name: nil)
      user.valid?
      expect(user).to be_invalid
      expect(user.errors[:name]).to include("can't be blank")
      expect(user.errors[:name]).to include('is too short (minimum is 1 character)')
    end

    example '1文字は登録できる' do
      user = build(:user, :with_team, email: 'bob@example.com', name: 'あ')
      user.valid?
      expect(user).to be_valid
    end

    example '15文字は登録できる' do
      user = build(:user, :with_team, email: 'bob@example.com', name: 'あああああああああああああああ')
      user.valid?
      expect(user).to be_valid
    end

    example '16文字は登録できない' do
      user = build(:user, :with_team, email: 'bob@example.com', name: 'ああああああああああああああああ')
      user.valid?
      expect(user).to be_invalid
      expect(user.errors[:name]).to include('is too long (maximum is 15 characters)')
    end
  end
end
