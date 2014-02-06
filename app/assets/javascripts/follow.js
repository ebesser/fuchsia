$(function(){
  var user_id = window.user_id;

  $.ajax({
    url: "/users/" + user_id + "/following",
    type: "put",
    dataType: "json",
    data: {user_id: window.user_id},
    success: (function(data){
      console.log(data[0].topic_id)
    })
  })
})