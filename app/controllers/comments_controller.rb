class CommentsController < ApplicationController 

  def index 
    respond_to do |format|
      format.html
      format.json { render json: Comment.all.to_json }
    end
  end

  def create
    respond_to do |format|
      format.json do 
        comment = Comment.create( body: params['comment']['body'], 
                                  agree:  params['comment']['agree'] 
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
        comment = Comment.find(params[:id])
        comment.destroy
        render :json => comment.to_json
      end
    end
  end


  # def update
  #   respond_to do |format|
  #     format.json do
  #       comment = Comment.find(params[:id])
  #       comment.title = params['comment']['title']
  #       comment.link  = params['comment']['link']
  #       comment.body  = params['comment']['body']
  #       comment.save
  #       render :json => comment.to_json
  #     end
  #   end
  # end

end