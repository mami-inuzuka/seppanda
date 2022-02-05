# frozen_string_literal: true

FactoryBot.define do
  factory :host_user, class: 'User' do
    name { 'host_user' }
    email { 'host_user@example.com' }
    password { 'testtest' }
    association :team
  end

  # 招待される側の場合はsave前にinvitation_tokenをもとにteamを紐づけるため新たにteamを作成しない
  # そのため association :team の設定を外している
  factory :guest_user, class: 'User' do
    name { 'guest_user' }
    email { 'guest_user@example.com' }
    password { 'testtest' }
  end
end
