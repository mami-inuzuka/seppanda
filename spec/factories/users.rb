# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'Alice' }
    sequence(:email) { |n| "tester#{n}@example.com" }
    password { 'testtest' }
    confirmed_at { Time.zone.today }

    trait :with_team do
      association :team
    end
  end
end
