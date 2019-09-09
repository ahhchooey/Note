class Api::SessionController < ApplicationController

  def create
    @user = User.find_by_creds(params[:user][:email], params[:user][:password])

    if @user
      login(@user)
      render :show
    else
      render json: {errors: "Email or Password is invalid."}
    end
  end

  def destroy
    logout
    render json: {}
  end
end
