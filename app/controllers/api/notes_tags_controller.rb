class Api::NotesTagsController < ApplicationController

  def create
    @notestag = NotesTag.new(note_id: params[:note_id], tag_id: params[:tag_id])

    if @notestag.save
      return
    else
      render json: @notestag.errors.full_messages, status: 422
    end
  end

  def destroy
    @notestag = NotesTag.where("note_id = #{params[:note_id]}").where("tag_id = #{params[:tag_id]}")
    @notestag.first.destroy
    render json: ["association destroyed"]
  end

end
