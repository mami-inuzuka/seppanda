if @user
  json.user do
    json.partial! 'api/auth/sessions/user', user: @user
  end
  json.is_login true
else
  json.is_login false
end
