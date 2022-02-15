json.array! @payments_by_date do |date, payments|
  json.set! "date", date
  json.payments do
    json.array!(payments) do |payment|
      json.extract! payment, :id, :amount, :detail, :paid_at, :settled, :settled_at
      json.user payment.user
      if payment.user.avatar.attached?
        json.avatar do
          json.data polymorphic_url(payment.user.avatar.variant(resize: "200x200"))
          json.name payment.user.avatar.blob.filename
        end
      end
    end
  end
end
