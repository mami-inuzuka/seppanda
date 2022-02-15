json.array!(@payments) do |payment|
  json.extract! payment, :amount, :paid_at, :detail, :id, :settled, :settled_at
  json.user payment.user
  json.avatar do
    json.data polymorphic_url(payment.user.avatar.variant(resize: "200x200"))
    json.name payment.user.avatar.blob.filename
  end
end


