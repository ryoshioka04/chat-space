json.array! @messages do |message|
  json.content     message.content
  json.image       message.image_url
  json.date        message.created_at.to_s
  json.user_name   message.user.name
  json.id          mいessage.id
end