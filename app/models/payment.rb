class Payment < ApplicationRecord
  belongs_to :team
  belongs_to :user

  validates :amount, format: { with: /\A[0-9]+\z/ }, presence: true, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 9999999 }
end
