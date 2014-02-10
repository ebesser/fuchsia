class Comment < ActiveRecord::Base
  attr_accessible :body, :user, :user_id, :topic_id, :username, :rank, :img_url, :agree
  
  belongs_to :topic 
  belongs_to :user
end
