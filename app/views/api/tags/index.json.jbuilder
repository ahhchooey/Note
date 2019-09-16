
@tags.each do |tag|
  json.set! tag.id do
    json.extract! tag, :id, :user_id, :title
  end
end
