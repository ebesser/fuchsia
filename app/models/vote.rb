class Vote < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :comment
  belongs_to :user
end
