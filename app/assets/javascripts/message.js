$(function() {

  function buildMessage(message) {

    // ビューに追加するHTMLを生成
    var content = message.content ? `${message.content}` : '';
    var image = message.image ? `<img src=${message.image}>` : '';
    var html =
      `<div class="chat-side__body__message" data-id="${message.id}"> 
         <div class="chat-side__body__message-user">
           ${message.user_name}
         </div>
         <div class="chat-side__body__message-daytime">
           ${message.date}
         </div>
         <div class="chat-side__body__message-text">
           ${content}
         </div>
           ${image}
       </div>`
    return html;
  }
  // 非同期通信
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
      $('#new_message')[0].reset();
    })

    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    });
    return false;
  });
  // 自動更新
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-side__body__message:last').data('id');
      var href = 'api/messages'
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: { id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildMessage(message);
          $('.chat-side__body').append(insertHTML);
          $('.chat-side__body').animate({scrollTop: $('.chat-side__body')[0].scrollHeight});
        });
      })

      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});
