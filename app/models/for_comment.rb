class ForComment < ActiveRecord::Base
  attr_accessible :body
  
  belongs_to :topic 
  belongs_to :user
end
