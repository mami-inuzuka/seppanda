# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  example '名前、メールアドレス、パスワードがあれば登録できる' do
    user = build(:user, :with_team)
    expect(user).to be_valid
  end

  example '名前がなければ登録できない' do
    user = build(:user, name: nil)
    user.valid?
    expect(user).to be_invalid
    expect(user.errors[:name]).to include("can't be blank")
  end

  example 'メールアドレスがなければ登録できない' do
    user = build(:user, email: nil)
    user.valid?
    expect(user).to be_invalid
    expect(user.errors[:email]).to include("can't be blank")
  end

  example 'パスワードがなければ登録できない' do
    user = build(:user, password: nil)
    user.valid?
    expect(user).to be_invalid
    expect(user.errors[:password]).to include("can't be blank")
  end

  example 'メールアドレスが重複していたら登録できない' do
    create(:user, :with_team, email: 'alice@example.com')
    user = build(:user, email: 'alice@example.com')
    user.valid?
    expect(user).to be_invalid
    expect(user.errors[:email]).to include('has already been taken')
  end
end
