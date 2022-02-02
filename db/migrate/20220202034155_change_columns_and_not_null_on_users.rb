class ChangeColumnsAndNotNullOnUsers < ActiveRecord::Migration[6.1]
  def change
    change_column_null :users, :team_id, false
  end
end
