class AddTeamIdUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :team, foreign_key: true
  end
end
