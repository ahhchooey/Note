
@notes.each do |note|
  json.set! note.id do
    json.extract! note, :id, :user_id, :body, :notebook_id, :updated_at, :title
  end
end
