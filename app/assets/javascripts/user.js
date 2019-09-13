$(function() {

  var search_result = $("#user-search-result");
  var text_field = $("#user-search-field");

  function appendUser(user) {
    var html = 
      `<div class="chat-group-user clearfix">
         <p class="chat-group-user__name">${ user.name }</p>
         <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
       </div>`

    search_result.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = 
      `<div class="chat-group-user clearfix">
         <p class="chat-group-user__name">${ msg }</p>
       </div>`

    search_result.append(html);
  }

  text_field.on("keyup", function() {

    var input = text_field.val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {

      search_result.empty();

      if (users.length !== 0) {
          users.forEach(function(user){
              appendUser(user);
          });
      }
      else{
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $('body').on("click", ".chat-group-user__btn--add", function() {
    var add_chat_member_element = $(".js-chat-member").parent();
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    var html = 
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
         <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
         <p class='chat-group-user__name'>${ user_name }</p>
         <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
       </div>`

    add_chat_member_element.append(html);

    $(this).parent().remove();

  });

  $('body').on("click", ".js-remove-btn", function () {

    $(this).parent().remove();

  });

});