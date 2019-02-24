$(function(){
  function buildHTML(message){
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
                    <% if message.content.present? %>
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <% end %>
                    <%= image_tag message.image.url, class: "lower-message__image" if message.image.present? %>
                  </div>
                </div>`
    return html;
  }
  function scroll(){
    $(".messages").animate({scrollTop: $(".massage")[0].scrollHeight});
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    console.log(this)
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
      $(".form__message").val("");
      scroll()
    })
    .fail(function(){
      alert("error");
    })
  })
})
