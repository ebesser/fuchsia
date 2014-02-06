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
        console.log(data);
        theTopic.text(data.title);
        theLink.text(data.link);
        theBody.text(data.body);
        // console.log(data.title + " " + data.link + " " + data.body);
    })
  })
})