class TopicsController < ApplicationController 

  def index 
    respond_to do |format|
      format.html
      format.json {render json: Topic.all.to_json}
    end
  end

end