json.extract! @payment, :id, :amount, :detail, :paid_at, :settled, :settled_at
json.user do
  json.partial! 'api/users/user', user: @payment.user
end
