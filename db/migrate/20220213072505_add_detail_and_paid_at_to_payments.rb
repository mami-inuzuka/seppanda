class AddDetailAndPaidAtToPayments < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :detail, :string
    add_column :payments, :paid_at, :date, null: false
  end
end
