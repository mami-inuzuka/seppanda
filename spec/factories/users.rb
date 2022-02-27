# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:uid) { |n| "uid#{n}" }
    sequence(:name) { |n| "tester#{n}" }
    color { 'orange' }
    trait :with_team do
      association :team
    end
  end
end
