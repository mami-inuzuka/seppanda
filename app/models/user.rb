# frozen_string_literal: true

class User < ApplicationRecord
  has_one_attached :avatar
  belongs_to :team
  has_many :payments, dependent: :destroy
  validates :name, presence: true, length: { minimum: 1, maximum: 15 }
end
