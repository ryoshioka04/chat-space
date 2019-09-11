$(function() {

  function buildMessage(message) {
    if ( message.image ) {
      var html =
        `<div class="chat-side__body__message">
           <div class="chat-side__body__message-user">
             ${message.user_name}
           </div>
           <div class="chat-side__body__message-daytime">
             ${message.date}
           </div>
           <div class="chat-side__body__message-text">
             ${message.content}
           </div>
         </div>
         <img src=${message.image} >`
      return html;
    } else {
      var html =
        `<div class="chat-side__body__message">
           <div class="chat-side__body__message-user">
             ${message.user_name}
           </div>
           <div class="chat-side__body__message-daytime">
             ${message.date}
           </div>
           <div class="chat-side__body__message-text">
             ${message.content}
           </div>
         </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false, 
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.chat-side__body').append(html);
      $('.chat-side__body').animate({scrollTop: $('.chat-side__body')[0].scrollHeight}, 'fast');
      $('#message_content')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  });
});
