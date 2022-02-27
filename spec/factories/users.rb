# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:uid) { |n| "uid#{n}" }
    sequence(:name) { |n| "tester#{n}" }
    color { 'orange' }
    trait :with_team do
      association :team
    end
    after(:build) do |user|
      user.avatar.attach(io: File.open('spec/fixtures/files/test_user_icon.png'), filename: 'test_user_icon.png', content_type: 'image/png')
    end
  end
end
