class Comment < ActiveRecord::Base
  attr_accessible :body, :agree
  
  belongs_to :topic 
  belongs_to :user
end
