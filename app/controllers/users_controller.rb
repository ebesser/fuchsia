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
        results_array = []
        follows.each do |follow|
          results_array << follow.topic_id.to_i
        end 
        render :json => Follow.where(user_id: user)
      end
    end
  end



end