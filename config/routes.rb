Vitriol::Application.routes.draw do

  devise_for :users

  root :to => "topics#index"


  resources :topics, only: [:index, :create, :destroy, :show]
  resources :comments, only: [:index, :create, :destroy, :show]
  resources :users, only: [:index, :show]
  resources :comments do
    put "upvote"
    put "downvote"
  end

  resources :topics do
    put "follow"
    put "winner"
  end

  resources :users do 
    put "following"
  end


  get '/shoot_mail' => 'home#shoot_mail'

  
end
