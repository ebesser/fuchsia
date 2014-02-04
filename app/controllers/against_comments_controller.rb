class AgainstCommentsController < ApplicationController 

  def index 
    respond_to do |format|
      format.html
      format.json { render json: AgainstComment.all.to_json }
    end
  end

  def create
    respond_to do |format|
      format.json do 
        comment = AgainstComment.create( body:    params['comment']['body'], 
                                         user_id: params['comment']['user_id'],
                                         topic_id: params['comment']['topic_id']
                                       )
        render :json => comment.to_json
      end
    end
  end
  
  def new

  end

  def destroy
    respond_to do |format|
      format.json do
        comment = AgainstComment.find(params[:id])
        comment.destroy
        render :json => comment.to_json
      end
    end
  end


  # def update
  #   respond_to do |format|
  #     format.json do
  #       comment = ForComment.find(params[:id])
  #       comment.title = params['comment']['title']
  #       comment.link  = params['comment']['link']
  #       comment.body  = params['comment']['body']
  #       comment.save
  #       render :json => comment.to_json
  #     end
  #   end
  # end

end