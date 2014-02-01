class Comment < ActiveRecord::Base
  attr_accessible :title, :body
  
  belongs_to :topic 
  belongs_to :user
end
