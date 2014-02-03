class CreateAgainstComments < ActiveRecord::Migration
  def change
    create_table :against_comments do |t|
      t.text :body
      t.integer :user_id
      t.integer :topic_id
      t.timestamps
    end
  end
end
