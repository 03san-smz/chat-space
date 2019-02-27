$(document).on("turbolinks:load", function(){

  var search_list = $("#user-search-result");
  function appendSearchUserResult(user){
    var html = `<div id="user-search-result">
                  <div class="chat-group-user js-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>
                </div>`
    search_list.append(html);
  }

  function notMatchUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    search_list.append(html);
  }

  function addUser(name,user_id){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${user_id}">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn"> 削除</a>
                </div>`
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: {keyword: input},
      dataType: "json"
    })
    .done(function(searchUserName){
      $("#user-search-result").empty();
      if(searchUserName.length !== 0){
        searchUserName.forEach(function(user){
          appendSearchUserResult(user);
        });
      }
      else {
        notMatchUser("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });

  $("#user-search-result").on("click", ".chat-group-user__btn--add", function(e){
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    addUser(name,user_id);
    $(this).parent().remove();
    $("#user-search-field").val("");
  });

  $("#chat-group-users").on("click", ".js-remove-btn", function(e){
    $(this).parent().remove();
  });
});
