# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :payments, dependent: :destroy

  # 現在は1teamにつき2人まで登録できるようにする
  MAX_TEAM_MENBER_NUMBER = 2

  def total_amount
    payments.sum(:amount)
  end

  def payment_per_person
    total_amount / MAX_TEAM_MENBER_NUMBER
  end

  def refund_amount
    (users.first.payments.sum(:amount) - payment_per_person).abs
  end

  def user_id_and_total_amount
    users.map { |user| [user.id, user.payments.sum(:amount)] }.to_h
  end

  def largest_payment_user
    User.find(user_id_and_total_amount.key(user_id_and_total_amount.values.max)) if user_id_and_total_amount.values.max != user_id_and_total_amount.values.min
  end

  def smallest_payment_user
    User.find(user_id_and_total_amount.key(user_id_and_total_amount.values.min)) if user_id_and_total_amount.values.max != user_id_and_total_amount.values.min
  end

  def capacity_reached?
    users.length == MAX_TEAM_MENBER_NUMBER
  end

  def self.invitation_token_exists?(invitation_token)
    Team.exists?(invitation_token: invitation_token)
  end
end
