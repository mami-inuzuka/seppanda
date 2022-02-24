if @user
  json.user do
    json.partial! 'api/auth/sessions/user', user: @user
  end
  json.is_existed true
else
  json.is_existed false
end
