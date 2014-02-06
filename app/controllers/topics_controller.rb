class TopicsController < ApplicationController 

  def index 
    respond_to do |format|
      format.html
      format.json { render json: Topic.all.to_json }
    end
  end

  def create
    respond_to do |format|
      format.json do 
        topic = Topic.create( 
          title:   params['topic']['title'], 
          link:    params['topic']['link'], 
          body:    params['topic']['body'],
          user_id: params['topic']['user_id']  
        )
        render :json => topic.to_json
      end
    end
  end
  
  def new

  end

  def show
    respond_to do |format|
      format.html do
      end

      format.json do
        topic = Topic.find(params[:id])
        render :json => topic.to_json
      end
    end
  end


  def follow
     respond_to do |format|
      format.html do
        # if params.class = Integer

        follow = Follow.new
        follow.user_id = params['user']
        follow.topic_id = params['topic_id']
        follow.save!

        render :json => follow.to_json
      end
    end
  end


  def destroy
    respond_to do |format|
      format.json do
        topic = Topic.find(params[:id])
        topic.destroy
        follow_arr = [];
        follow_arr = Follow.where(topic_id: params[:id])
        follow_arr.each do |follow|
          follow.destroy
        end

        render :json => topic.to_json
      end
    end
  end


  def update
    respond_to do |format|
      format.json do
        topic = Topic.find(params[:id])
        topic.title = params['topic']['title']
        topic.link  = params['topic']['link']
        topic.body  = params['topic']['body']
        topic.save
        render :json => topic.to_json
      end
    end
  end

end