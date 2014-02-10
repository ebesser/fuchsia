'use strict';
var comments_application = {

  fetch: function(success_fnc){
    var self = this;  

    $.ajax({
      url: '/comments', 
      dataType: 'json', 
      method: 'get'
    })
      .success(function(data){
        self.comments = [];
        $(data).each(function(idx, comment_ele){
          var new_comment = new Comment( 
            comment_ele.body, 
            comment_ele.created_at, 
            comment_ele.user_id,
            comment_ele.username,
            comment_ele.img_url,
            comment_ele.topic_id,
            comment_ele.rank,
            comment_ele.agree,
            comment_ele.id
          );
          self.comments.push(new_comment)
        })
        success_fnc(); //call the function passed in
      }); 
  },

  render: function(){
    $('#the_for_comments').empty();
    $('#the_against_comments').empty();

    var commentsReversed = $(this.comments).sort(function(a,b){ return b["rank"] - a["rank"] });

    commentsReversed.each(function(idx, comment){  
      console.log('im here!!!' + comment.agree )
      if (comment.agree === true) { 
        $('#the_for_comments').append(comment.renderCurrent());
      } else {
        $('#the_against_comments').append(comment.renderCurrent());
      }
    })  
  },

  bind_buttons: function(){
    $('.remove').on('click', function(e){
      $(this).parent().data("comment").sync('destroy');
      $(this).parent().remove();
    }),

    $('.upvote').on('click', function(e){
      $(this).parent().data("comment").sync('upvote');
      comments_application.fetch(success_fnc);
    }),

    $('.downvote').on('click', function(e){
      $(this).parent().data("comment").sync('downvote');
      comments_application.fetch(success_fnc);
    });

  }

};

var success_fnc = function(){
  comments_application.render()
  comments_application.bind_buttons()
};


// *********************************************
//  Define Comment
function Comment(body, created_at, user_id, username, img_url, topic_id, rank, agree, id){
  this.body       = body;
  this.created_at = created_at;
  this.user_id    = user_id;
  this.username   = username;
  this.img_url    = img_url;
  this.topic_id   = topic_id;
  this.rank       = rank;
  this.agree      = agree;
  this.id         = id;
}

// Local give-me-the-html-for-current-list
Comment.prototype.renderCurrent = function(){
  var displayedTopic = window.location.pathname.replace("/topics/", "")
  if (displayedTopic == this.topic_id) {
    var new_li =   $("<li>", {class: "comment_item"});
    new_li.append( $("<img>").addClass("user_img"    ).attr('src', this.img_url ) );
    new_li.append( $("<h3>" ).addClass("username"    ).append(this.username) );
    new_li.append( $("<p>"  ).addClass("created"     ).append(this.created_at) ); 
    new_li.append( $("<p>"  ).addClass("comment_body").append(this.body) );
    if (window.user_id) {
      new_li.append( $("<button>", {class: "upvote" }).append("+") );
    }
    //Color the rank blue or red depending on if it's positive or negative, respectively
    var new_span = $("<span>", {class: "rank"});
    new_span.append( this.rank - 100);
    if (this.rank >= 100 ) {
      new_span.css('color', 'rgb(50, 112, 205)');
    } else {
      new_span.css('color', 'red');
    }
    new_li.append( new_span ); 
  
    if (window.user_id) {
      new_li.append( $("<button>", {class: "downvote"}).append("-") );
    }
    
    if (window.user_id === this.user_id) { 
      new_li.append( $("<button>", {class: "remove"  }).append("&#10007;") );
    }
    
    new_li.data("comment", this);
    
    return new_li;
  }

}


//  Local update
Comment.prototype.update = function(data){
  this.body       = data.body
  this.created_at = data.created_at
  this.topic_id   = data.topic_id
  this.rank       = data.rank
  this.user_id    = data.user_id
  this.username   = data.username
  this.img_url    = data.img_url
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
      data: {comment: comment_data},
      success: function(){
       comments_application.fetch(success_fnc);
      }
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
    
  case 'upvote':
  ajax_options = {
    url: '/comments/' + this.id + '/upvote',
    dataType: 'json',
    method: 'put', 
    data: {comment: comment_data}
  }
  break;
    
  case 'downvote':
    ajax_options = {
      url: '/comments/' + this.id + '/downvote',
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
    $('#input_for').val("");
    if (new_comment_body.length > 0){
      var new_comment = new Comment();
      new_comment.sync('create', { 
        body:     new_comment_body,
        user_id:  window.user_id,
        username: window.username,
        img_url:  window.img_url,
        agree:    true,
        topic_id: window.location.pathname.replace("/topics/", "")
      });
    }
    
  });


  $('#button_against').on('click', function(e){
    var new_comment_body = $('#input_against').val();  
    $('#input_against').val("");
    if (new_comment_body.length > 0){
      var new_comment = new Comment();
      new_comment.sync('create', { 
        body:     new_comment_body,
        user_id:  window.user_id,
        username: window.username,
        img_url:  window.img_url,
        agree:    false,
        topic_id: window.location.pathname.replace("/topics/", "")
      });
    }
    
  });


});





