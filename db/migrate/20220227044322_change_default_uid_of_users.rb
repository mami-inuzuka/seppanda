class ChangeDefaultUidOfUsers < ActiveRecord::Migration[6.1]
  def change
    change_column_default(:users, :uid, nil)
  end
end
