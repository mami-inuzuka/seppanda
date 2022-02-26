json.refund_amount @team.refund_amount
if @team.largest_payment_user.present?
  json.largest_payment_user do
    json.partial! 'api/users/user', user: @team.largest_payment_user
  end
end
if  @team.smallest_payment_user.present?
  json.smallest_payment_user do
    json.partial! 'api/users/user', user: @team.smallest_payment_user
  end
end
json.is_team_capacity_reached @team.capacity_reached?
json.invitation_token @team.invitation_token
