class UsersController < ApplicationController 

  def show
    respond_to do |format|
      format.html do
      end

      format.json do
        user = User.find(params[:id])
        render :json => user.to_json
      end
    end
  end

  def following 
    respond_to do |format|
      format.json do
        user = User.find(params[:user_id])
        follows = Follow.where(user_id: user)
        follows_array = []
        follows.each do |follow|
          follows_array << {:topic_id => follow.topic_id, :topic_name => Topic.find(follow.topic_id).title}
        end
        unique_follows = follows_array.uniq
        render :json => unique_follows
      end
    end
  end


end