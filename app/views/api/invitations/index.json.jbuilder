if @user
  json.name @user.name
  json.avatar do
    json.data Rails.application.routes.url_helpers.rails_representation_url(@user.avatar.variant(resize: "200x200"))
    json.name @user.avatar.blob.filename
  end
end
