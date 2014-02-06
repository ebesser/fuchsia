

$(function(){
	$.ajax({
      url: '/topics/' + topic_id + '/winner', 
      dataType: 'json', 
      method: 'put'
    })
      .success(function(data){
      	console.log('works')
      });	
})