class Api::NotesController < ApplicationController

  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id

    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def index
    if params[:notebook_id]
      @notes = Note.where("user_id = #{current_user.id}").where("notebook_id = #{params[:notebook_id]}")
    else
      @notes = Note.where("user_id = #{current_user.id}")
    end
    render :index
  end

  def show
    @note = Note.find_by(id: params[:id])
    render :show
  end

  def update
    @note = Note.find_by(id: params[:id])

    if @note.update(note_params)
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = Note.find_by(id: params[:id])
    @note.destroy
    render :show
  end

  private
  def note_params
    params.require(:note).permit(:user_id, :notebook_id, :title, :body)
  end
end
