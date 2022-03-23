if @user
  json.name @user.name
  json.avatar do
    json.data Rails.application.routes.url_helpers.rails_storage_proxy_url(@user.avatar.variant(resize: "100x100"))
    json.name @user.avatar.blob.filename
  end
end
