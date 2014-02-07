$(function(){
  if (window.user_id) {
    var user_id = window.user_id;

    $.ajax({
      url: "/users/" + user_id + "/following",
      type: "put",
      dataType: "json",
      data: {user_id: window.user_id},
      success: (function(data){
        for (i in data) {
          var new_li =  $("<li>", {class: "followed_topic"});
          new_li.append("<a href='/topics/" + data[i]['topic_id'] + "'>" + data[i]['topic_name'] + "</a><hr>");
        
          $('.home').append(new_li);
        }             
      })
    })
  }
})
  

