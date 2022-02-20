# frozen_string_literal: true

class User < ApplicationRecord
  has_one_attached :avatar
  belongs_to :team
  has_many :payments, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
  validates :name, presence: true
end
