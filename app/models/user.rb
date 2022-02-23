# frozen_string_literal: true

class User < ApplicationRecord
  has_one_attached :avatar
  belongs_to :team
  has_many :payments, dependent: :destroy
  validates :email, :uid, uniqueness: true
  validates :email, :uid, presence: true
end
