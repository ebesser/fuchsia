'use strict';
var comments_application = {

  comments: [],

  fetch: function(success_fnc){
    var self = this;
    this.comments = [];

    $.ajax({
      url: '/comments', 
      dataType: 'json', 
      method: 'get'
    })
      .success(function(data){
        $(data).each(function(idx, comment_ele){
          var new_comment = new Comment(comment_ele.body, 
                                    comment_ele.created_at, 
                                    comment_ele.agree, 
                                    comment_ele.id
                                   );
          self.comments.push(new_comment)
        })
        success_fnc(); //call the function passed in
      }); 
  },

  render: function(){
    $('#comments-list').empty()
    var commentsReversed = $(this.comments).sort(function(a,b){ return b["id"] - a["id"] });

    commentsReversed.each(function(idx, comment){   
    $('#comments-list').append(comment.renderCurrent());
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
//  Define Comment
function Comment(body, created_at, agree, id){
  this.body       = body;
  this.created_at = created_at;
  this.agree      = agree;
  this.id         = id;
}

// Local give-me-the-html-for-current-list
Comment.prototype.renderCurrent = function(){
  var new_div =   $("<div>",    {class: "comment-item"      });
  new_div.append('hello!!!!');
  // new_div.append( $("<div>",    {class: "comment-title"     }).append('<a href="/comments/'+ this.id +'">'+ this.title + '</a>') ); 
  // new_div.append( $("<div>",    {class: "comment-created_at"}).append(this.created_at) );
  // new_div.append( $("<div>",    {class: "comment-link"      }).append(this.link) );
  // new_div.append( $("<div>",    {class: "comment-body"      }).append(this.body) );
  // new_div.append( $("<button>", {class: "remove"          }).append("&#10007;") );
  // new_div.data("comment", this);
  return new_div;
}


//  Local update
Comment.prototype.update = function(data){
  this.body       = data.body
  this.created_at = data.created_at
  this.agree      = data.agree
};

// Database mutation of destroy
Comment.prototype.destroy = function(){
  $.ajax({
    url: '/comments/' + this.id,
    dataType: 'json',
    method: 'delete'
  })
    .success(function(data){
      console.log('I got em.  Done... ')
    });
};



Comment.prototype.sync = function(method, comment_data){

  var self = this;

  var ajax_options;

  switch (method){
  case 'create':
    ajax_options = {
      url: '/comments',
      dataType: 'json',
      method: 'post',
      data: {comment: comment_data}
    }
    break;
  case 'get':
    ajax_options = {
      url: '/comments/' + this.id,
      dataType: 'json',
      method: 'get'
    }
    break;
  case 'update':
    ajax_options = {
      url: '/comments/' + this.id,
      dataType: 'json',
      method: 'put', 
      data: {comment: comment_data}
    }
    break;
  case 'destroy':
    ajax_options = {
      url: '/comments/' + this.id,
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
    comments_application.render()
    comments_application.bind_buttons()
  };

  comments_application.fetch(success_fnc);


  $('#button_for').on('click', function(e){
    var new_comment_body = $('#input_for').val();  
    if (new_comment_body.length > 0){
      var new_comment = new Comment();
      new_comment.sync('create', { body: new_comment_body, 
                                   agree: true
                                 });
      comments_application.fetch(success_fnc);
    }

  });

  $('#button_against').on('click', function(e){
    var new_comment_body = $('#input_against').val();  
    if (new_comment_body.length > 0){
      var new_comment = new Comment();
      new_comment.sync('create', { body: new_comment_body, 
                                   agree: false
                                 });
      comments_application.fetch(success_fnc);
    }

  });


});
