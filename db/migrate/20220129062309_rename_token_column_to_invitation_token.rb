class RenameTokenColumnToInvitationToken < ActiveRecord::Migration[6.1]
  def change
    rename_column :teams, :token, :invitation_token
  end
end
