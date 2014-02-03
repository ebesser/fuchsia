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
        topic = Topic.create( title: params['topic']['title'], 
                              link:  params['topic']['link'], 
                              body:  params['topic']['body'] 
                            )
        render :json => topic.to_json
      end
    end
  end
  
  def new

  end

  def show
    # console.log(params[:id])
    # console.log(params)
    # binding.pry

    respond_to do |format|
      format.html do
         topic = Topic.find(params[:id])
        # console.log('params id= ' +params[:id])
        # binding.pry
        render :json => topic.to_json
      end

      format.json do
        topic = Topic.find(params[:id])
        console.log('params id= ' +params[:id])
        # binding.pry
        render :json => topic.to_json
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        topic = Topic.find(params[:id])
        topic.destroy
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