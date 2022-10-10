json.payments do
  json.array! @payments do |payment|
    json.extract! payment, :id, :amount, :detail, :paid_at, :settled, :settled_at
    json.user do
      json.partial! 'api/users/simple_user', user: payment.user
    end
  end
end
json.is_last_page @last_page
