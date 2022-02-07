# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :users, dependent: :destroy

  # 現在は1teamにつき2人まで登録できるようにする
  MAX_TEAM_MENBER_NUMBER = 2

  def capacity_reached?
    users.length == MAX_TEAM_MENBER_NUMBER
  end

  def self.invitation_token_valid?(invitation_token)
    exists?(invitation_token: invitation_token)
  end
end
