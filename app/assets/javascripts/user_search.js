$(function() {
  
  var search_result = $(".user-search-result");

// 検索したユーザーのHTMLを組み立て
  function appendUser(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user.name }</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</div>
      </div>`

    search_result.append(html);
  }
  // 一致するユーザーがいない
  function appendNoUser() {
    var html = 
        `<div class="chat-group-user clearfix">
          一致するユーザーがいません
        </div>`

    search_result.append(html);
  }
// 追加したユーザーのHTMLを組み立て 
  function addUser(user_id,user_name) {
    var html = 
        `<div class='chat-group-user clearfix js-chat-member'>
          <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
          <p class='chat-group-user__name'>${ user_name }</p>
          <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>`

    $('#chat-group-users').append(html);
  }
  // ユーザー検索処理
  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
      $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
      })
    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) { 
        users.forEach(function(user) {
        appendUser(user);
        });
      } else {
        appendNoUser();
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });
  

// チャットメンバー追加処理
  $(document).on("click", ".user-search-add", function() {
    $('.chat-group-user').val();
    var user_id = $(this).data("user-id"); 
    var user_name = $(this).data("user-name");
    addUser(user_id,user_name);
    $(this).parent().remove();
  });
//チャットメンバーから除く 
  $(document).on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  });
});
