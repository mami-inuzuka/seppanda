team = Team.find(user.team_id)
json.extract! user, :id, :name, :uid, :team_id, :created_at, :updated_at, :color
if user.avatar.attached?
  json.avatar do
    json.data Rails.application.routes.url_helpers.rails_storage_proxy_url(user.avatar)
    json.data_small Rails.application.routes.url_helpers.rails_storage_proxy_url(user.avatar)
    json.name user.avatar.blob.filename
  end
end
