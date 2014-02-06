Vitriol::Application.routes.draw do

  devise_for :users

  root :to => "topics#index"


  resources :topics, only: [:index, :create, :destroy, :show, :update]
  resources :for_comments, only: [:index, :create, :destroy, :show, :update]
  resources :against_comments, only: [:index, :create, :destroy, :show, :update]
  resources :users, only: [:index, :show]
  resources :for_comments do
    put "upvote"
    put "downvote"
  end

  resources :against_comments do
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
