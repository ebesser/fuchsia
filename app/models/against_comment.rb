class AgainstComment < ActiveRecord::Base
  attr_accessible :body, :user, :user_id, :topic_id, :username, :img_url, :rank
  
  belongs_to :topic 
  belongs_to :user
end
