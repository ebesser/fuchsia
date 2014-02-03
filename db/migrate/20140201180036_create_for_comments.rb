class CreateForComments < ActiveRecord::Migration
  def change 
    create_table :for_comments do |t| 
      t.text :body
      t.integer :user_id
      t.integer :topic_id
      t.timestamps
    end
  end
end
