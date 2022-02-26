
team = Team.find(@user.team_id)
json.user do
  json.partial! 'api/users/user', user: @user
end
json.invitation_token team.invitation_token
json.is_team_capacity_reached team.capacity_reached?
