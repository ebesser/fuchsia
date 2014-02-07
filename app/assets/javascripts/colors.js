var bgGradient = function(winner){
  var bg_gradient = $('#bg_gradient')
  console.log(winner); 
  if (winner == 1) {
    bg_gradient.css({
      background: "-webkit-linear-gradient(-5deg, rgb(155, 198, 255) 60%, rgb(250, 255, 90) 60%)",
    });
  }
  else if (winner == -1) {
    bg_gradient.css({
      background: "-webkit-linear-gradient(5deg, rgb(155, 198, 255) 10%, rgb(250, 255, 90) 10%)"
    });
  }
  else if (winner == 0) {
    bg_gradient.css({
      background: "-webkit-linear-gradient(180deg, rgb(155, 198, 255) 50%, rgb(250, 255, 90) 50%)"
    });
  }
}

$(function(){
  var topic_id = window.location.pathname.replace("/topics/", "");
  var buttonFor = $('#button_for');
  var buttonAgainst = $('#button_against');

  buttonFor.on("click", function(e){
    console.log("works");
      $.ajax({
      url: '/topics/' + topic_id + '/winner', 
      dataType: 'json', 
      method: 'put',
      success: (function(data){
        bgGradient(data);
      })
    })
  });

  buttonAgainst.on("click", function(e){
    console.log("works");
      $.ajax({
      url: '/topics/' + topic_id + '/winner', 
      dataType: 'json', 
      method: 'put',
      success: (function(data){
        bgGradient(data);
      })
    })
  });

if (window.location.pathname.indexOf("topics") >= 0 ) {
	$.ajax({
      url: '/topics/' + topic_id + '/winner', 
      dataType: 'json', 
      method: 'put',
      success: (function(data){
      	bgGradient(data);
      })
  	})
  }
})