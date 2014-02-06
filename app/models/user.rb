class User < ActiveRecord::Base
  validates_uniqueness_of :username
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :img_url, :username
  # attr_accessible :title, :body


  has_many :topics
  has_many :for_comments
  has_many :against_comments
  has_many :votes

  # we are essentially aliasing .posts to .faves
  # method name       joiner table       lookup_table
  has_many :voted_on, :through => :for_votes,     :source => :for_comment
  has_many :voted_on, :through => :against_votes, :source => :against_comment

  has_many :followed, :through => :follows, :source => :topic


end
