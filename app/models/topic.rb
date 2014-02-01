class Topic < ActiveRecord::Base
  attr_accessible :title, :link, :body
  
  belongs_to :user
  has_many :comments
end

