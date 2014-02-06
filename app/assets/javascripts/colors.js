var bgGradient = function(winner){
  var bg_gradient = $('#bg_gradient')
  console.log(winner); 
  if (winner == 1) {

  }
  else if (winner == -1) {

  }
  else if (winner == 0) {
    bg_gradient.css({
      background: "-moz-linear-gradient(-15deg, #db5151 75%, #e1e281 78%)",
      background: "-webkit-gradient(linear, left top, right bottom, color-stop(75%,#db5151), color-stop(78%,#e1e281))",
      background: "-webkit-linear-gradient(-15deg, #db5151 75%,#e1e281 78%)",
      background: "-o-linear-gradient(-15deg, #db5151 75%,#e1e281 78%)",
      background: "-ms-linear-gradient(-15deg, #db5151 75%,#e1e281 78%)",
      background: "linear-gradient(135deg, #db5151 75%,#e1e281 78%)",
      filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#db5151', endColorstr='#e1e281',GradientType=1 )"
    });
  }
}

$(function(){
    var topic_id = window.location.pathname.replace("/topics/", "");

	$.ajax({
      url: '/topics/' + topic_id + '/winner', 
      dataType: 'json', 
      method: 'put',
      success: (function(data){
      	bgGradient(data);
      })
  	})
})