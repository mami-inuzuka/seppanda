# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :payments, dependent: :destroy

  # 現在は1teamにつき2人まで登録できるようにする
  MAX_TEAM_MENBER_NUMBER = 2

  def unsettled_total_amount
    payments.unsettled.sum(:amount)
  end

  # チーム全体の未清算支払額の合計を人数で割ったものが一人当たり払うべき額
  def split_bill_amount
    unsettled_total_amount / MAX_TEAM_MENBER_NUMBER
  end

  def refund_amount
    (first_user_unsettled_total_amount - split_bill_amount).abs
  end

  def largest_payment_user
    User.find(user_id_and_total_amount.key(user_id_and_total_amount.values.max)) unless refund_amount.zero?
  end

  def smallest_payment_user
    User.find(user_id_and_total_amount.key(user_id_and_total_amount.values.min)) unless refund_amount.zero?
  end

  def capacity_reached?
    users.length == MAX_TEAM_MENBER_NUMBER
  end

  def self.invitation_token_exists?(invitation_token)
    Team.exists?(invitation_token: invitation_token)
  end

  private

  def user_id_and_total_amount
    users.map { |user| [user.id, user.payments.unsettled.sum(:amount)] }.to_h
  end

  def first_user_unsettled_total_amount
    users.first.payments.unsettled.sum(:amount)
  end
end
