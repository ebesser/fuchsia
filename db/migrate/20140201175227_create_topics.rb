class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title
      t.text :body
      t.text :link
      t.integer :user_id
      t.string :username
      t.timestamps
    end
  end
end
