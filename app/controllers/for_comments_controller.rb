class ForCommentsController < ApplicationController 

  def index 
    respond_to do |format|
      format.html
      format.json { render json: ForComment.all.to_json }
    end
  end

  def create
    respond_to do |format|
      format.json do 
        comment = ForComment.create( 
          body:     params['comment']['body'], 
          user_id:  params['comment']['user_id'],
          username: params['comment']['username'],
          img_url:  params['comment']['img_url'],
          topic_id: params['comment']['topic_id'],
          rank:     params['comment']['rank']
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
        comment = ForComment.find(params[:id])
        comment.destroy
        render :json => comment.to_json
      end
    end
  end

  def upvote
     respond_to do |format|
      format.html do
        comment = ForComment.find(params[:for_comment_id].to_i)
        comment.increment(:rank)
        comment.save!
        render :json => comment.to_json
      end
    end
  end

  def downvote
    respond_to do |format|
      format.html do
        comment = ForComment.find(params[:for_comment_id].to_i)
        comment.decrement(:rank)
        comment.save!
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