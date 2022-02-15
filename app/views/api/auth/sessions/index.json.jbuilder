if @current_api_user
  json.user do
    json.extract! @current_api_user, :allow_password_change, :created_at, :image, :nickname, :provider, :team_id, :updated_at,:id, :name, :email, :uid
    if @current_api_user.avatar.attached?
      json.avatar do
        json.data polymorphic_url(@current_api_user.avatar.variant(resize: "200x200"))
        json.name @current_api_user.avatar.blob.filename
      end
    end
  end
  json.is_login true
else
  json.is_login false
end
