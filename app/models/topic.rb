class Topic < ActiveRecord::Base
  attr_accessible :title, :link, :body, :user_id, :user, :username
  
  belongs_to :user
  has_many :comments
end

