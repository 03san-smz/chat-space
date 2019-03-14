$(function(){
  function buildHTML(message){
    var image = (message.image_url) ? `<img class= "lower-message__image" src = ${message.image_url} >` : ``
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
     return html;
  }
  function scroll(){
    $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},"fast");
  }

// 非同期通信投稿
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      console.table(this);      // これは後で削除
      $(".messages").append(html);
      $(".form__submit").prop("disabled", false);
      $("#new_message")[0].reset();
      scroll();
    })
    .fail(function(){
      alert("error");
      $(".form__submit").prop("disabled", false);
    })
  });

  // 非同期通信自動更新
  $(function(){
      setInterval(update, 5000);
  });
  function update(){
    if($(".messages")[0]){
      var last_message_id = $(".message:last").data("message_id");
       console.log(this)      // これは後で削除
    } else {
      var last_message_id = 0
    }
    $.ajax({
      url: location.href,
      type: "GET",
      data: { id: last_message_id },
      dataType: "json"
    })
    .always(function(data){
      $.each(data, function(i, data){
        buildHTML(data);
      });
    });
  }
});
