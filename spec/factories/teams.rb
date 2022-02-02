# frozen_string_literal: true

FactoryBot.define do
  factory :team do
    invitation_token { 1234567890 }
  end
end
