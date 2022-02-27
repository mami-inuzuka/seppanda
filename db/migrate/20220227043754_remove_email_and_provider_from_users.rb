class RemoveEmailAndProviderFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :email, :string
    remove_column :users, :provider, :string
  end
end
