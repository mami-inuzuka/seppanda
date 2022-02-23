# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:uid) { |n| "uid#{n}" }
    color { 'orange' }
    sequence(:email) { |n| "tester#{n}@example.com" }
    trait :with_team do
      association :team
    end
  end
end
