'use strict';
var for_comments_application = {

  for_comments: [],

  fetch: function(success_fnc){
    var self = this;
    this.for_comments = [];

    $.ajax({
      url: '/for_comments', 
      dataType: 'json', 
      method: 'get'
    })
      .success(function(data){
        $(data).each(function(idx, comment_ele){
          var new_comment = new ForComment(comment_ele.body, 
                                    comment_ele.created_at, 
                                    comment_ele.user_id,
                                    comment_ele.id
                                   );
          self.comments.push(new_comment)
        })
        success_fnc(); //call the function passed in
      }); 
  },

  render: function(){
    $('#for_comments').empty()
    var commentsReversed = $(this.comments).sort(function(a,b){ return b["id"] - a["id"] });

    commentsReversed.each(function(idx, comment){   
    $('#for_comments').append(comment.renderCurrent());
    })  
  },

  bind_buttons: function(){
    $('.remove').on('click', function(e){
      $(this).parent().data("comment").sync('destroy');
      $(this).parent().remove();
    });
  }

};

// *********************************************
//  Define ForComment
function ForComment(body, created_at, user_id, id){
  this.body       = body;
  this.created_at = created_at;
  this.user_id = user_id;
  this.id         = id;
}

// Local give-me-the-html-for-current-list
ForComment.prototype.renderCurrent = function(){
  var new_li =    $("<li>",     {class: "commen_item"});
  new_div.append( $("<div>",    {class: "comment-created_at"}).append(this.created_at) );
  new_div.append( $("<div>",    {class: "comment_user_id"}).append(this.user_id) ); 
  new_div.append( $("<div>",    {class: "comment_body"}).append(this.body) ); 
  new_div.append( $("<button>", {class: "remove"}).append("&#10007;") );
  new_div.data("comment", this);
  return new_li;
}


//  Local update
ForComment.prototype.update = function(data){
  this.body       = data.body
  this.created_at = data.created_at
  this.user_id = data.user_id
};

// Database mutation of destroy
ForComment.prototype.destroy = function(){
  $.ajax({
    url: '/forcomments/' + this.id,
    dataType: 'json',
    method: 'delete'
  })
    .success(function(data){
      console.log('I got em.  Done... ')
    });
};



ForComment.prototype.sync = function(method, comment_data){

  var self = this;

  var ajax_options;

  switch (method){
  case 'create':
    ajax_options = {
      url: '/for_comments',
      dataType: 'json',
      method: 'post',
      data: {comment: comment_data}
    }
    break;
  case 'get':
    ajax_options = {
      url: '/for_comments/' + this.id,
      dataType: 'json',
      method: 'get'
    }
    break;
  case 'update':
    ajax_options = {
      url: '/for_comments/' + this.id,
      dataType: 'json',
      method: 'put', 
      data: {comment: comment_data}
    }
    break;
  case 'destroy':
    ajax_options = {
      url: '/for_comments/' + this.id,
      dataType: 'json',
      method: 'delete' 
    } 
  }

  $.ajax(ajax_options)
    .success(function(data){
      self.update(data)
    })
};


$(function document_ready(){
  console.log('document is ready');

  var success_fnc = function(){
    for_comments_application.render()
    for_comments_application.bind_buttons()
  };

  for_comments_application.fetch(success_fnc);


  $('#button_for').on('click', function(e){
    var new_comment_body = $('#input_for').val();  
    if (new_comment_body.length > 0){
      var new_comment = new ForComment();
      new_comment.sync('create', { body: new_comment_body,
                                   user_id: window.user_id 
                                 });
      for_comments_application.fetch(success_fnc);
    }

  });

});
