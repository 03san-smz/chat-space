$(function(){
  function buildHTML(message){
    var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
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
      $(".messages").append(html);
      $(".form__submit").prop("disabled", false);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},"fast");
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert("error");
      $(".form__submit").prop("disabled", false);
    })
  });
  $(function(){
      setInterval(update, 5000);
    });
  function update(){
    if($(".messages")[0]){
      var message_id = $(".messages:last").data("id");
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: "GET",
      data: {
        message: { id: message_id }
      },
      dataType: "json"
    })
    .always(function(data){
      $.each(data, function(i, data){
        buildHTML(data);
      });
    });
  }
});
