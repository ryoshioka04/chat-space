$(document).on("turbolinks:load", function() {
  $(function() {
    var pre_input = "";
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
    function appendErrMsgToHTML(user) {
      var html = 
         `<div class="chat-group-user clearfix">
            一致するユーザーがいません
          </div>`

      search_result.append(html);
    }
    // 検索結果のリセット
    function resetResult() {
      search_result.empty();
    }
  // 追加したユーザーのHTMLを組み立て 
    function addUser(user_id,user_name) {
      var html = 
         `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
            <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
            <p class='chat-group-user__name'>${ user_name }</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
          </div>`

      $('#chat-group-users').append(html);
    }
    //userを検索結果として表示するかを判定する
    function judgeUserResult(users) {
      let user_apended_flag = false;
  
      let menber_names = $('.chat-group-user__name').map(function(index, elem){return $(elem).text();}).get();

      users.forEach(function(user) {
  
        if ($.inArray(user.nickname, menber_names) < 0) {
          appendUser(user);
          user_apended_flag = true;
        }
      });
      return user_apended_flag;
    }

    // ユーザーインクリメンタルサーチ
    $("#user-search-field").on("keyup", function(event) {
      event.preventDefault();
      var input = $(this).val();
      if ((input.length > 0) && (pre_input != input)) {
        pre_input = input;
        $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json'
        })
        .done(function(users) {
        resetResult();
        if (!((users.length > 0) ? judgeUserResult(users) : false)) {
          appendErrMsgToHTML();
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
      } else if(input.length <= 0) {
      resetResult();
      }
    });
  // 追加済みチャットメンバー
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
});