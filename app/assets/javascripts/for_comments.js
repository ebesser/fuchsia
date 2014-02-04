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
          var new_comment = new ForComment( 
            comment_ele.body, 
            comment_ele.created_at, 
            comment_ele.user_id,
            comment_ele.username,
            comment_ele.img_url,
            comment_ele.topic_id,
            comment_ele.rank,
            comment_ele.id
          );
          self.for_comments.push(new_comment)
        })
        success_fnc(); //call the function passed in
      }); 
  },

  render: function(){
    $('#the_for_comments').empty()
    var commentsReversed = $(this.for_comments).sort(function(a,b){ return b["id"] - a["id"] });

    commentsReversed.each(function(idx, comment){   
    $('#the_for_comments').append(comment.renderCurrent());
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
function ForComment(body, created_at, user_id, username, img_url, topic_id, rank, id){
  this.body       = body;
  this.created_at = created_at;
  this.user_id    = user_id;
  this.username   = username;
  this.img_url    = img_url;
  this.topic_id   = topic_id;
  this.rank       = rank;
  this.id         = id;
}

// Local give-me-the-html-for-current-list
ForComment.prototype.renderCurrent = function(){
  var displayedTopic = window.location.pathname.replace("/topics/", "")
  if (displayedTopic == this.topic_id) {
    var new_li =   $("<li>", {class: "comment_item"});
    new_li.append( $("<img>").attr('src', this.img_url ) );
    new_li.append( $("<h3>").append(this.username) );
    new_li.append( $("<p>").append(this.created_at) ); 
    new_li.append( $("<p>").append(this.body) );
    if (window.user_id === this.user_id) {
      new_li.append( $("<button>", {class: "remove"}).append("&#10007;") );
    }
    new_li.data("comment", this);
    return new_li;
  }

}


//  Local update
ForComment.prototype.update = function(data){
  this.body       = data.body
  this.created_at = data.created_at
  this.topic_id   = data.topic_id
  this.rank       = data.rank
  this.user_id    = data.user_id
  this.username   = data.username
  this.img_url    = data.img_url
};

// Database mutation of destroy
ForComment.prototype.destroy = function(){
  $.ajax({
    url: '/for_comments/' + this.id,
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
      new_comment.sync('create', { 
        body:     new_comment_body,
        user_id:  window.user_id,
        username: window.username,
        img_url:  window.img_url,
        topic_id: window.location.pathname.replace("/topics/", "")
      });
      for_comments_application.fetch(success_fnc);
    }

  });

});
