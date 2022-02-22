class RemovecolumnsFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_sent_at, :datetime
    remove_column :users, :allow_password_change, :boolean
    remove_column :users, :remember_created_at, :datetime
    remove_column :users, :confirmation_token, :string
    remove_column :users, :confirmed_at, :datetime
    remove_column :users, :confirmation_sent_at, :datetime
    remove_column :users, :unconfirmed_email, :string
    remove_column :users, :nickname, :string
    remove_column :users, :image, :string
    remove_column :users, :tokens, :json
  end
end
