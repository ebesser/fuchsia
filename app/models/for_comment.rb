class ForComment < ActiveRecord::Base
  attr_accessible :body, :user, :user_id, :topic_id, :username, :rank, :img_url
  
  belongs_to :topic 
  belongs_to :user
end
