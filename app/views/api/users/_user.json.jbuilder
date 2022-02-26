team = Team.find(user.team_id)
json.extract! user, :id, :name, :email, :uid, :team_id, :created_at, :updated_at, :color
json.is_debt team.smallest_payment_user == user
if user.avatar.attached?
  json.avatar do
    json.data polymorphic_url(user.avatar.variant(resize: "200x200"))
    json.name user.avatar.blob.filename
  end
end
