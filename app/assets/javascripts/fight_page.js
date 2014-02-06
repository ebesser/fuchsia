$(function(){
  var theTopic = $('#the_topic');
  var theLink = $('#the_link');
  var theBody = $('#the_description');
  var theUser = $('#topic_submitter');
  
  if (window.location.pathname.indexOf("topics") >= 0 ) {
    var topic_id = window.location.pathname.replace("/topics/", "")

    $.ajax({
      url: "/topics/" + topic_id,
      type: "get",
      dataType: "json",
      success: (function(data){
          theTopic.text(data.title);
          theUser.text("Submited By: "+data.username);
          if (data.link) {
            theLink.append( $("<div>", {class: "topic_link"      })
                   .append('<a href="'+ data.link +'" target="_blank">'+ data.link.substring(0,30) + '</a>') );
          }
          theBody.text(data.body);
          // console.log(data.title + " " + data.link + " " + data.body);
      })
    })
  }
})