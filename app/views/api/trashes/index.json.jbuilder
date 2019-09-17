
@trashes.each do |trash|
  json.set! trash.id do
    json.extract! trash, :id, :title, :body, :user_id, :updated_at
  end
end
