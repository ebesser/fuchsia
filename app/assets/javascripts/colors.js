var bgGradient = function(winner){
  var bg_gradient = $('#bg_gradient')
  console.log(winner); 
  if (winner == 1) {
    bg_gradient.css({
      background: "-webkit-linear-gradient(-15deg, rgb(155, 198, 255) 75%, rgb(250, 255, 90) 75%)",
    });
  }
  else if (winner == -1) {
    bg_gradient.css({
      background: "-webkit-linear-gradient(-15deg, rgb(155, 198, 255) 25%, rgb(250, 255, 90) 25%)"
    });
  }
  else if (winner == 0) {
    bg_gradient.css({
      background: "-webkit-linear-gradient(-15deg, rgb(155, 198, 255) 50%, rgb(250, 255, 90) 50%)"
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

	$.ajax({
      url: '/topics/' + topic_id + '/winner', 
      dataType: 'json', 
      method: 'put',
      success: (function(data){
      	bgGradient(data);
      })
  	})
})