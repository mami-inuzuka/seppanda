team = Team.find(user.team_id)
json.extract! user, :id, :color
if user.avatar.attached?
  json.avatar do
    json.data Rails.application.routes.url_helpers.rails_storage_proxy_url(user.avatar)
    json.data_small Rails.application.routes.url_helpers.rails_storage_proxy_url(user.avatar)
  end
end
