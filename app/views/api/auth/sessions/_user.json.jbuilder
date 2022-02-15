json.extract! user, :id, :name, :email, :uid, :team_id, :allow_password_change, :created_at, :updated_at
json.color user == Team.find(user.team_id).users.first ? 'orange' : 'blue'
if user.avatar.attached?
  json.avatar do
    json.data polymorphic_url(user.avatar.variant(resize: "200x200"))
    json.name user.avatar.blob.filename
  end
end
