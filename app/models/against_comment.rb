class AgainstComment < ActiveRecord::Base
  attr_accessible :body, :user, :user_id
  
  belongs_to :topic 
  belongs_to :user
end
