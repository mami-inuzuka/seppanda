# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Team, type: :model do
  let(:host_user) { create(:user, :with_team) }
  let(:other_user) { create(:user, team_id: host_user.team_id) }
  let(:team) { host_user.team }

  context '人数制限' do
    example '1つのteamに含まれるユーザーが1人の時は満員ではない' do
      expect(host_user.team.capacity_reached?).to be false
    end

    example '1つのteamに含まれるユーザーが2人の時満員となる' do
      create(:user, team_id: host_user.team_id)
      expect(host_user.team.capacity_reached?).to be true
    end
  end

  context '支払い金額' do
    context '片方の未精算金額が大きい場合' do
      before do
        host_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
        host_user.payments.create(amount: 800, detail: 'スーパー', team_id: team.id, paid_at: '2022-02-25')
        other_user.payments.create(amount: 300, detail: 'カフェ', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
        other_user.payments.create(amount: 200, detail: '日用品', team_id: team.id, paid_at: '2022-02-25')
      end

      # TODO: 本来はprivateメソッドは直接テストすべきではないためテストケースの整理も含めて後ほど設計を見直す
      example '#user_id_and_total_amount' do
        ret = team.send(:user_id_and_total_amount)
        expect(ret.size).to eq 2
        expect(ret).to eq({ host_user.id => 800, other_user.id => 200 })
      end

      example '各ユーザーの支払い合計金額' do
        expect(host_user.payments.sum(:amount)).to eq 1000
        expect(other_user.payments.sum(:amount)).to eq 500
      end

      example '各ユーザーの未精算支払い合計金額' do
        expect(host_user.payments.unsettled.sum(:amount)).to eq 800
        expect(other_user.payments.unsettled.sum(:amount)).to eq 200
      end

      example 'teamの未清算支払い合計金額' do
        expect(team.unsettled_total_amount).to eq 1000
      end

      example '1人あたり支払うべき金額（split_bill_amount）' do
        expect(team.split_bill_amount).to eq 500
      end

      example '返金額（refund_amount）' do
        expect(team.refund_amount).to eq 300
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー（largest_payment_user）' do
        expect(team.largest_payment_user).to eq host_user
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー（smallest_payment_user）' do
        expect(team.smallest_payment_user).to eq other_user
      end
    end

    context '一度精算済みで片方のみ新たに支払いを登録している場合' do
      before do
        host_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
        host_user.payments.create(amount: 800, detail: 'スーパー', team_id: team.id, paid_at: '2022-02-25')
        other_user.payments.create(amount: 300, detail: 'カフェ', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
      end

      # TODO: 本来はprivateメソッドは直接テストすべきではないためテストケースの整理も含めて後ほど設計を見直す
      example '#user_id_and_total_amount' do
        ret = team.send(:user_id_and_total_amount)
        expect(ret.size).to eq 2
        expect(ret).to eq({ host_user.id => 800, other_user.id => 0 })
      end

      example '各ユーザーの支払い合計金額' do
        expect(host_user.payments.sum(:amount)).to eq 1000
        expect(other_user.payments.sum(:amount)).to eq 300
      end

      example '各ユーザーの未精算支払い合計金額' do
        expect(host_user.payments.unsettled.sum(:amount)).to eq 800
        expect(other_user.payments.unsettled.sum(:amount)).to eq 0
      end

      example 'teamの未清算支払い合計金額' do
        expect(team.unsettled_total_amount).to eq 800
      end

      example '1人あたり支払うべき金額（split_bill_amount）' do
        expect(team.split_bill_amount).to eq 400
      end

      example '返金額（refund_amount）' do
        expect(team.refund_amount).to eq 400
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー（largest_payment_user）' do
        expect(team.largest_payment_user).to eq host_user
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー（smallest_payment_user）' do
        expect(team.smallest_payment_user).to eq other_user
      end
    end

    context '2人の未精算金額が等しい場合' do
      before do
        host_user.payments.create(amount: 200, detail: '外食', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
        host_user.payments.create(amount: 800, detail: 'スーパー', team_id: team.id, paid_at: '2022-02-25')
        host_user.payments.create(amount: 200, detail: 'カフェ', team_id: team.id, paid_at: '2022-02-25')
        other_user.payments.create(amount: 300, detail: 'カフェ', team_id: team.id, paid_at: '2022-02-14', settled: true, settled_at: '2022-02-24')
        other_user.payments.create(amount: 500, detail: '日用品', team_id: team.id, paid_at: '2022-02-25')
        other_user.payments.create(amount: 500, detail: 'おやつ', team_id: team.id, paid_at: '2022-02-25')
      end

      # TODO: 本来はprivateメソッドは直接テストすべきではないためテストケースの整理も含めて後ほど設計を見直す
      example '#user_id_and_total_amount' do
        ret = team.send(:user_id_and_total_amount)
        expect(ret.size).to eq 2
        expect(ret).to eq({ host_user.id => 1000, other_user.id => 1000 })
      end

      example '各ユーザーの支払い合計金額' do
        expect(host_user.payments.sum(:amount)).to eq 1200
        expect(other_user.payments.sum(:amount)).to eq 1300
      end

      example '各ユーザーの未精算支払い合計金額が等しい' do
        expect(host_user.payments.unsettled.sum(:amount)).to eq other_user.payments.unsettled.sum(:amount)
      end

      example '1人あたり支払うべき金額（split_bill_amount）' do
        expect(team.split_bill_amount).to eq 1000
      end

      example '返金額（refund_amount）' do
        expect(team.refund_amount).to eq 0
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー（largest_payment_user）' do
        expect(team.largest_payment_user).to eq nil
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー（smallest_payment_user）' do
        expect(team.smallest_payment_user).to eq nil
      end
    end

    context '支払い金額が0の場合' do
      example '各ユーザーの支払い合計金額' do
        expect(host_user.payments.sum(:amount)).to eq 0
        expect(other_user.payments.sum(:amount)).to eq 0
      end

      example '各ユーザーの未精算支払い合計金額' do
        expect(host_user.payments.unsettled.sum(:amount)).to eq 0
        expect(other_user.payments.unsettled.sum(:amount)).to eq 0
      end

      example 'teamの未清算支払い合計金額' do
        expect(team.unsettled_total_amount).to eq 0
      end

      example '1人あたり支払うべき金額（split_bill_amount）' do
        expect(team.split_bill_amount).to eq 0
      end

      example '返金額（refund_amount）' do
        expect(team.refund_amount).to eq 0
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー（largest_payment_user）' do
        expect(team.largest_payment_user).to eq nil
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー（smallest_payment_user）' do
        expect(team.smallest_payment_user).to eq nil
      end
    end
  end
end
