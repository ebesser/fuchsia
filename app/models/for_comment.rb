class ForComment < ActiveRecord::Base
  attr_accessible :body, :user, :user_id, :topic_id
  
  belongs_to :topic 
  belongs_to :user
end
