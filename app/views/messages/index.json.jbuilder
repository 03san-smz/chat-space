json.array! @new_message do |message|
  json.id message.id
  json.user_name message.user.name
  json.content message.content
  json.image message.image
  json.time message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
end
