class CreateAgainstVotes < ActiveRecord::Migration
  def change
    create_table :against_votes do |t|
      t.integer :user_id
      t.integer :comment_id
      t.timestamps
    end
  end
end
