# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Payment, type: :model do
  let(:user) { create(:user, :with_team) }
  let(:team_id) { user.team_id }

  context 'amount' do
    example '0以上9999999以下の半角数字で整数であれば登録できる' do
      payment = user.payments.build(amount: 100, team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_valid
    end

    example '全角数字は登録できない' do
      payment = user.payments.build(amount: '１００', team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_invalid
      expect(payment.errors[:amount]).to include('は数値で入力してください')
    end

    example '金額の入力がないと登録できない' do
      payment = user.payments.build(amount: nil, team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_invalid
      expect(payment.errors[:amount]).to include('を入力してください')
    end

    example '小数は登録できない' do
      payment = user.payments.build(amount: 100.5, team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_invalid
      expect(payment.errors[:amount]).to include('は整数で入力してください')
    end

    example '0は登録できない' do
      payment = user.payments.build(amount: 0, team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_invalid
      expect(payment.errors[:amount]).to include('は0より大きい値にしてください')
    end

    example '1は登録できる' do
      payment = user.payments.build(amount: 1, team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_valid
    end

    example '9999999は登録できる' do
      payment = user.payments.build(amount: 9999999, team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_valid
    end

    example '10000000は登録できない' do
      payment = user.payments.build(amount: 10000000, team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_invalid
      expect(payment.errors[:amount]).to include('は9999999以下の値にしてください')
    end
  end

  context 'detail' do
    example '0文字でも登録できる' do
      payment = user.payments.build(amount: 100, detail: '', team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_valid
    end

    example '28文字だと登録できる' do
      payment = user.payments.build(amount: 100, detail: 'ああああああああああああああああああああああああああああ', team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_valid
    end

    example '29文字だと登録できない' do
      payment = user.payments.build(amount: 100, detail: 'あああああああああああああああああああああああああああああ', team_id: team_id, paid_at: '2022-02-14')
      payment.valid?
      expect(payment).to be_invalid
      expect(payment.errors[:detail]).to include('は28文字以内で入力してください')
    end
  end
end
