class ChangeDatatypeSettledAtOfPayments < ActiveRecord::Migration[6.1]
  def change
    change_column :payments, :settled_at, :datetime
  end
end
