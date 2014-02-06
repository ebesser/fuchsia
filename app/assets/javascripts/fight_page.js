$(function(){
  var theTopic = $('#the_topic');
  var theLink = $('#the_link');
  var theBody = $('#the_description');
  var topic_id = window.location.pathname.replace("/topics/", "")

  $.ajax({
    url: "/topics/" + topic_id,
    type: "get",
    dataType: "json",
    success: (function(data){
        theTopic.text(data.title);
        if (data.link) {
          theLink.append( $("<div>", {class: "topic_link"      })
                 .append('<a href="'+ data.link +'">'+ data.link.substring(0,20) + '</a>') );
        }
        theBody.text(data.body);
        // console.log(data.title + " " + data.link + " " + data.body);
    })
  })
})