json.content @message.content
json.user_name @message.user.name
json.date @message.created_at.to_s
json.id @message.id
json.image @message.image_url