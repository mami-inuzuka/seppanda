# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  context 'name' do
    example '空では登録できない' do
      user = build(:user, :with_team, name: nil)
      user.valid?
      expect(user).to be_invalid
      expect(user.errors[:name]).to include('を入力してください')
      expect(user.errors[:name]).to include('は1文字以上で入力してください')
    end

    example '1文字は登録できる' do
      user = build(:user, :with_team, name: 'あ')
      user.valid?
      expect(user).to be_valid
    end

    example '15文字は登録できる' do
      user = build(:user, :with_team, name: 'あああああああああああああああ')
      user.valid?
      expect(user).to be_valid
    end

    example '16文字は登録できない' do
      user = build(:user, :with_team, name: 'ああああああああああああああああ')
      user.valid?
      expect(user).to be_invalid
      expect(user.errors[:name]).to include('は15文字以内で入力してください')
    end
  end
end
