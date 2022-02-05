FactoryBot.define do
  factory :user do
    name { 'Alice' }
    sequence(:email) { |n| "tester#{n}@example.com" }
    password { 'testtest' }

    trait :with_team do
      association :team
    end
  end
end
