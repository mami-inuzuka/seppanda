# frozen_string_literal: true

class Team < ApplicationRecord
  has_many :users, dependent: :destroy
end
