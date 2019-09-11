
@notebooks.each do |notebook|
  json.set! notebook.id do
    json.extract! notebook, :id, :user_id, :updated_at, :title
  end
end

