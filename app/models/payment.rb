# frozen_string_literal: true

class Payment < ApplicationRecord
  belongs_to :team
  belongs_to :user

  validates :amount, format: { with: /\A[0-9]+\z/ }, presence: true, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 9_999_999 }
  validates :detail, length: { maximum: 28 }
  validates :paid_at, presence: true

  scope :unsettled, -> { where(settled: false) }
end
