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

end