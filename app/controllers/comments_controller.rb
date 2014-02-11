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
        comment = Comment.create( 
          body:     params['comment']['body'], 
          user_id:  params['comment']['user_id'],
          username: params['comment']['username'],
          img_url:  params['comment']['img_url'],
          topic_id: params['comment']['topic_id'],
          agree:    params['comment']['agree']
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

  def upvote
     respond_to do |format|
      format.html do
        comment = Comment.find(params[:comment_id])
        comment.increment(:rank)
        comment.save!
        render :json => comment.to_json
      end
    end
  end

  def downvote
    respond_to do |format|
      format.html do
        comment = Comment.find(params[:comment_id])
        comment.decrement(:rank)
        comment.save!
        render :json => comment.to_json
      end
    end
  end


end