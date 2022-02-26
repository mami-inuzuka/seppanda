  json.user do
    json.partial! 'api/auth/sessions/user', user: @user
  end
