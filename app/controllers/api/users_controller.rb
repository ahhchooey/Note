class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    
    if @user.save
      notebook = Notebook.create(title: "Masterbook", user_id: @user.id)
      Note.create(title: "First Note", user_id: @user.id, notebook_id: notebook.id, body: "")
      @user["default_notebook"] = notebook.id
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end

