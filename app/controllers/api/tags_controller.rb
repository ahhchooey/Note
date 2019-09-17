class Api::TagsController < ApplicationController

  def create
    @tag = Tag.new(tag_params)
    @tag.user_id = current_user.id

    if @tag.save
      render :show
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def index
    if params[:note_id]
      ntid = params[:note_id].to_i
      @tags = Note.find_by(id: ntid).tags
    else
      @tags = Tag.where("user_id = #{current_user.id}")
    end
    render :index
  end

  def update
    @tag = Tag.find_by(id: params[:id])

    if @tag.update(tag_params)
      render :show
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def destroy
    @tag = Tag.find_by(id: params[:id])
    @tag.destroy
    render :show
  end

  private
  def tag_params
    params.require(:tag).permit(:title)
  end
end
