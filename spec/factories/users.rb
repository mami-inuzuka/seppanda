# frozen_string_literal: true

FactoryBot.define do
  factory :first_user, class: 'User' do
    name { 'first_user' }
    email { 'first_user@example.com' }
    password { 'testtest' }
    association :team
  end

  # 2人目の場合はsave前にinvitation_tokenをもとにteamを紐づけるため新たにteamを作成しない
  # そのため association :team の設定を外している
  factory :second_user, class: 'User' do
    name { 'second_user' }
    email { 'second_user@example.com' }
    password { 'testtest' }
  end
end
