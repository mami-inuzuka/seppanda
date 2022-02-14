# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Team, type: :model do
  context '人数制限' do
    let(:host_user) { create(:user, :with_team) }

    example '1つのteamに含まれるユーザーが1人の時は満員ではない' do
      expect(host_user.team.capacity_reached?).to be false
    end

    example '1つのteamに含まれるユーザーが2人の時満員となる' do
      create(:user, team_id: host_user.team_id)
      expect(host_user.team.capacity_reached?).to be true
    end
  end

  context '支払い金額' do
    context '片方が多く支払っている場合' do
      let(:user1) { create(:user, :with_team) }
      let(:user2) { create(:user, team_id: user1.team_id) }
      let(:team) { user1.team }

      before do
        user1.payments.create(amount: 800, team_id: team.id, paid_at: '2022-02-14')
        user1.payments.create(amount: 200, team_id: team.id, paid_at: '2022-02-14')
        user2.payments.create(amount: 100, team_id: team.id, paid_at: '2022-02-14')
        user2.payments.create(amount: 300, team_id: team.id, paid_at: '2022-02-14')
      end

      example '各ユーザーの合計金額' do
        expect(user1.payments.sum(:amount)).to eq 1000
        expect(user2.payments.sum(:amount)).to eq 400
      end

      example 'teamの合計金額' do
        expect(team.total_amount).to eq 1400
      end

      example '1人あたり支払うべき金額' do
        expect(team.split_bill_amount).to eq 700
      end

      example '返金額' do
        expect(team.refund_amount).to eq 300
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー' do
        expect(team.largest_payment_user).to eq user1
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー' do
        expect(team.smallest_payment_user).to eq user2
      end
    end

    context '2人の支払い金額が同じ場合' do
      let(:user1) { create(:user, :with_team) }
      let(:user2) { create(:user, team_id: user1.team_id) }
      let(:team) { user1.team }

      before do
        user1.payments.create(amount: 800, team_id: team.id, paid_at: '2022-02-14')
        user1.payments.create(amount: 200, team_id: team.id, paid_at: '2022-02-14')
        user2.payments.create(amount: 500, team_id: team.id, paid_at: '2022-02-14')
        user2.payments.create(amount: 500, team_id: team.id, paid_at: '2022-02-14')
      end

      example '1人あたり支払うべき金額' do
        expect(team.split_bill_amount).to eq 1000
      end

      example '返金額' do
        expect(team.refund_amount).to eq 0
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー' do
        expect(team.largest_payment_user).to eq nil
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー' do
        expect(team.smallest_payment_user).to eq nil
      end
    end

    context '支払い金額が0の場合' do
      let(:user1) { create(:user, :with_team) }
      let(:user2) { create(:user, team_id: user1.team_id) }
      let(:team) { user1.team }

      example '各ユーザーの合計金額' do
        expect(user1.payments.sum(:amount)).to eq 0
        expect(user2.payments.sum(:amount)).to eq 0
      end

      example 'teamの合計金額' do
        expect(team.total_amount).to eq 0
      end

      example '1人あたり支払うべき金額' do
        expect(team.split_bill_amount).to eq 0
      end

      example '返金額' do
        expect(team.refund_amount).to eq 0
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー' do
        expect(team.largest_payment_user).to eq nil
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー' do
        expect(team.smallest_payment_user).to eq nil
      end
    end
  end
end
