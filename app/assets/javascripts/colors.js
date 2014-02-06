var bgGradient = function(winner){
  console.log(winner); 
  if (winner == 1) {

  }
  else if (winner == -1) {

  }
  else if (winner == 0) {
    
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