# frozen_string_literal: true

class User < ApplicationRecord
  has_one_attached :avatar
  belongs_to :team
  has_many :payments, dependent: :destroy
  validates :name, presence: true, length: { minimum: 1, maximum: 15 }

  def attach_avatar(data, name)
    if data.present?
      io = StringIO.new("#{decode(data)}\n")
      filename = name
    else
      io = File.open('./app/assets/images/default-user-icon.png')
      filename = 'default-user-icon.png'
    end
    blob = ActiveStorage::Blob.create_and_upload!(io: io, filename: filename)
    self.avatar.attach(blob)
  end

  private

  def decode(str)
    Base64.decode64(str.split(',').last)
  end
end
