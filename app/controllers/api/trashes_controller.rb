class Api::TrashesController < ApplicationController

  def create
    @trash = Trash.new(trash_params)

    if @trash.save
      render :show
    else
      render json: @trash.errors.full_messages, status: 422
    end
  end

  def index
    @trashes = Trash.where("user_id = #{current_user.id}")
    render :index
  end

  def show
    @trash = Trash.find_by(id: params[:id])
    render :show
  end

  def destroy
    if params[:trash]
      @trash = Trash.find_by(id: params[:id])
      Note.create(title: @trash.title, user_id: @trash.user_id, body: @trash.body, notebook_id:
                  current_user.default_notebook)
      @trash.destroy
      render :show
    else
      Trash.where("user_id = #{current_user.id}").destroy_all
      render json: {}
    end
  end

  private
  def trash_params
    params.require(:trash).permit(:user_id, :title, :body)
  end
end
