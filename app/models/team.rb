# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :payments, dependent: :destroy

  # 現在は1teamにつき2人まで登録できるようにする
  MAX_TEAM_MENBER_NUMBER = 2

  def total_amount
    self.payments.sum(:amount)
  end

  def payment_per_person
    self.total_amount / MAX_TEAM_MENBER_NUMBER
  end

  def refund_amount
    if user_id_and_total_amount.values.max == user_id_and_total_amount.values.min
      0
    else
      self.largest_payment_user.payments.sum(:amount) - self.payment_per_person
    end
  end

  def user_id_and_total_amount
    users.map { |user| [user.id, user.payments.sum(:amount)]}.to_h
  end

  def largest_payment_user
    if user_id_and_total_amount.values.max != user_id_and_total_amount.values.min
      User.find(self.user_id_and_total_amount.key(user_id_and_total_amount.values.max))
    end
  end

  def smallest_payment_user
    if user_id_and_total_amount.values.max != user_id_and_total_amount.values.min
      User.find(self.user_id_and_total_amount.key(user_id_and_total_amount.values.min))
    end
  end

  def capacity_reached?
    users.length == MAX_TEAM_MENBER_NUMBER
  end

  def self.invitation_token_exists?(invitation_token)
    Team.exists?(invitation_token: invitation_token)
  end
end
