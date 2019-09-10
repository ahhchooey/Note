class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_creds(params[:user][:email], params[:user][:password])

    if @user
      login(@user)
      render :show
    else
      render json: ["Email or Password is invalid."], status: 422
    end
  end

  def destroy
    logout
    render json: {}
  end
end
