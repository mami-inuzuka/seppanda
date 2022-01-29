# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :users, dependent: :destroy

  # 現在は1teamにつき2人まで登録できるようにする
  MAX_TEAM_MENBER_NUMBER = 2

  def self.enabled?(id)
    find(id).users.length == MAX_TEAM_MENBER_NUMBER
  end

  def self.invitation_token_valid?(token)
    find_by(invitation_token: token)
  end
end
