class Api::NotebooksController < ApplicationController

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user_id = current_user.id

    if @notebook.save
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def index
    @notebooks = Notebook.where("user_id = #{current_user.id}")
    render :index
  end

  def show
    @notebook = Notebook.find_by(id: params[:id])
    render :show
  end

  def update
    @notebook = Notebook.find_by(id: params[:id])

    if @notebook.update(notebook_params)
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find_by(id: params[:id])
    if @notebook.id == current_user.default_notebook
      render json: ["Cannot delete default notebook."]
    else
      @notebook.destroy
      render :show
    end
  end

  private
  def notebook_params
    params.require(:notebook).permit(:user_id, :title)
  end

end
