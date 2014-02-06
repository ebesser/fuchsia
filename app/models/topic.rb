class Topic < ActiveRecord::Base
  attr_accessible :title, :link, :body, :user_id, :user, :username
  
  belongs_to :user
  has_many :for_comments
  has_many :against_comments
end

