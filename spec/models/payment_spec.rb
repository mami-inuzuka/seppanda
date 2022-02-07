require 'rails_helper'

RSpec.describe Payment, type: :model do
  let(:user) { create(:user, :with_team) }

  example '0以上9999999以下の半角数字で整数であれば登録できる' do
    payment = Payment.new(amount: 100)
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_valid
  end

  example '全角数字は登録できない' do
    payment = Payment.new(amount: '１００')
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_invalid
    expect(payment.errors[:amount]).to include("is not a number")
  end

  example '金額の入力がないと登録できない' do
    payment = Payment.new(amount: nil)
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_invalid
    expect(payment.errors[:amount]).to include("can't be blank")
  end

  example '小数は登録できない' do
    payment = Payment.new(amount: 100.5)
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_invalid
    expect(payment.errors[:amount]).to include("must be an integer")
  end

  example '0は登録できない' do
    payment = Payment.new(amount: 0)
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_invalid
    expect(payment.errors[:amount]).to include("must be greater than 0")
  end

  example '1は登録できる' do
    payment = Payment.new(amount: 1)
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_valid
  end

  example '9999999は登録できる' do
    payment = Payment.new(amount: 9999999)
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_valid
  end

  example '10000000は登録できない' do
    payment = Payment.new(amount: 10000000)
    payment.user_id = user.id
    payment.team_id = user.team_id
    payment.valid?
    expect(payment).to be_invalid
    expect(payment.errors[:amount]).to include("must be less than or equal to 9999999")
  end
end
