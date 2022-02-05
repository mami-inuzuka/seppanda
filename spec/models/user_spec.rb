# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with a name, email, password and password confirmation' do
    user = build(:host_user)
    expect(user).to be_valid
  end

  it 'is invalid without a name' do
    user = build(:host_user, name: nil)
    user.valid?
    expect(user.errors[:name]).to include("can't be blank")
  end

  it 'is invalid without a email' do
    user = build(:host_user, email: nil)
    user.valid?
    expect(user.errors[:email]).to include("can't be blank")
  end

  it 'is invalid without a password' do
    user = build(:host_user, password: nil)
    user.valid?
    expect(user.errors[:password]).to include("can't be blank")
  end

  it 'is invalid duplicate email address' do
    create(:host_user, email: 'alice@example.com')
    user = build(:guest_user, email: 'alice@example.com')
    user.valid?
    expect(user.errors[:email]).to include('has already been taken')
  end
end
