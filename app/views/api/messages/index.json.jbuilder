json.array! @messages do |message|
  json.content     message.content
  json.user_name   message.user.name
  json.date        message.created_at.to_s(:datetime)
  json.id          message.id
  json.image       message.image_url
end