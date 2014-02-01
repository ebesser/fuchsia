class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body


  has_many :topics
  has_many :comments
  has_many :votes

  # we are essentially aliasing .posts to .faves
  # method name       joiner table       lookup_table
  has_many :voted_on, :through => :votes, :source => :comment




end
