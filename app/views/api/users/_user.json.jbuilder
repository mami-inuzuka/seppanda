team = Team.find(user.team_id)
json.extract! user, :id, :name, :uid, :team_id, :created_at, :updated_at, :color
if user.avatar.attached?
  json.avatar do
    json.data Rails.application.routes.url_helpers.rails_storage_proxy_url(user.avatar.variant(resize: "200x200^", gravity: "center", crop:"200x200+0+0").processed)
    json.data_small Rails.application.routes.url_helpers.rails_storage_proxy_url(user.avatar.variant(resize: "40x40^", gravity: "center", crop:"40x40+0+0").processed)
    json.name user.avatar.blob.filename
  end
end
