if @current_api_user
  json.user do
    json.partial! 'api/auth/sessions/user', user: @current_api_user
  end
  json.is_login true
else
  json.is_login false
end
