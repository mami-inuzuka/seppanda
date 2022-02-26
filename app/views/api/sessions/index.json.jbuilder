if @user
  json.user do
    json.partial! 'api/users/user', user: @user
  end
  json.is_existed true
else
  json.is_existed false
end
