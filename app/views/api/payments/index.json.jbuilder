json.array! @payments_group_by_paid_at do |date, payments|
  json.date date
  json.payments do
    json.array!(payments) do |payment|
      json.extract! payment, :id, :amount, :detail, :paid_at, :settled, :settled_at
      json.user do
        json.partial! 'api/sessions/user', user: payment.user
      end
    end
  end
end
