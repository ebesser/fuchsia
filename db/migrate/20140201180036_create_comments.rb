class CreateComments < ActiveRecord::Migration
  def change 
    create_table :comments do |t| 
      t.text :body
      t.integer :user_id
      t.string :username
      t.string :img_url
      t.integer :topic_id
      t.integer :rank, default: 100
      t.boolean :agree, default: true

      t.timestamps
    end
  end
end
