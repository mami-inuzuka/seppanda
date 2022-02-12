# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Team, type: :model do
  context '人数制限' do
    example '1つのteamに含まれるユーザーが2人の時満員となる' do
      host_user = create(:user, :with_team)
      guest_user = build(:user)
      guest_user.team_id = host_user.team_id
      guest_user.save
      expect(host_user.team.capacity_reached?).to be true
    end

    example '1つのteamに含まれるユーザーが1人の時は満員ではない' do
      host_user = create(:user, :with_team)
      expect(host_user.team.capacity_reached?).to be false
    end
  end

  context '支払い金額' do
    context '片方が多く支払っている場合' do
      let!(:user_1) { create(:user, :with_team) }
      let!(:user_2) { create(:user, team_id: user_1.team_id) }
      let!(:team) { user_1.team }
      let!(:payment_1) { user_1.payments.create(amount: 800, team_id: team.id) }
      let!(:payment_2) { user_1.payments.create(amount: 200, team_id: team.id) }
      let!(:payment_3) { user_2.payments.create(amount: 100, team_id: team.id) }
      let!(:payment_4) { user_2.payments.create(amount: 300, team_id: team.id) }

      example '各ユーザーの合計金額' do
        expect(user_1.payments.sum(:amount)).to eq 1000
        expect(user_2.payments.sum(:amount)).to eq 400
      end

      example 'teamの合計金額' do
        expect(team.total_amount).to eq 1400
      end

      example '1人あたり支払うべき金額' do
        expect(team.payment_per_person).to eq 700
      end

      example '返金額' do
        expect(team.refund_amount).to eq 300
      end

      example '一人当たり支払うべき金額より多く支払っているユーザー' do
        expect(team.largest_payment_user).to eq user_1
      end

      example '一人当たり支払うべき金額より支払いが少ないユーザー' do
        expect(team.smallest_payment_user).to eq user_2
      end
    end

    context '2人の支払い金額が同じ場合' do
      let!(:user_1) { create(:user, :with_team) }
      let!(:user_2) { create(:user, team_id: user_1.team_id) }
      let!(:team) { user_1.team }
      let!(:payment_1) { user_1.payments.create(amount: 800, team_id: team.id) }
      let!(:payment_2) { user_1.payments.create(amount: 200, team_id: team.id) }
      let!(:payment_3) { user_2.payments.create(amount: 500, team_id: team.id) }
      let!(:payment_4) { user_2.payments.create(amount: 500, team_id: team.id) }

      example '1人あたり支払うべき金額' do
        expect(team.payment_per_person).to eq 1000
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
      let!(:user_1) { create(:user, :with_team) }
      let!(:user_2) { create(:user, team_id: user_1.team_id) }
      let!(:team) { user_1.team }

      example '各ユーザーの合計金額' do
        expect(user_1.payments.sum(:amount)).to eq 0
        expect(user_2.payments.sum(:amount)).to eq 0
      end

      example 'teamの合計金額' do
        expect(team.total_amount).to eq 0
      end

      example '1人あたり支払うべき金額' do
        expect(team.payment_per_person).to eq 0
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
