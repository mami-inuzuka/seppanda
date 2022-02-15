json.refund_amount @team.refund_amount
json.largest_payment_user do
  json.partial! 'api/auth/sessions/user', user: @team.largest_payment_user
end
json.smallest_payment_user do
  json.partial! 'api/auth/sessions/user', user: @team.smallest_payment_user
end
json.is_team_capacity_reached @team.capacity_reached?
