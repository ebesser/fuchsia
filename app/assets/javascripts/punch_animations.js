var punchFor = function(){
  var forFist = $('#for_fist_front');
  var opponent = $("#fighter2");

  forFist
    .css({
      backgroundPosition: "0 -148px",
      width: "404px"
      })
    .animate({marginLeft: "100px", marginTop: "-50px"},50, function(){
      $(this).css({
        backgroundPosition: "0px -279px",
      })
    })
    .delay(60)
    .animate({marginLeft: "150px"},50, function(){
      $(this).css({
        backgroundPosition: "-269px 0px",
        width: "145px"
      })
    })
    .animate({marginLeft: "0px", marginTop: "0px"},300, function(){
      $(this).css({
        backgroundPosition: "-264px 0"
      })
    })

  opponent.delay(1)
      .transition({ rotate: '12deg' })
      .delay(5)
      .transition({ rotate: '-5deg' })
      .transition({ rotate: '0deg' });
};

var punchAgainst = function(){
  var againstFist = $('#against_fist_front');
  var opponent = $("#fighter1");

  againstFist
    .css({
      backgroundPosition: "0 -148px",
      width: "404px"
      })
    .animate({marginLeft: "-350px", marginTop: "-50px"},50, function(){
      $(this).css({
        backgroundPosition: "0px -279px",
      })
    })
    .delay(60)
    .animate({marginLeft: "-150px"},50, function(){
      $(this).css({
        backgroundPosition: "0px 0px",
        width: "145px"
      })
    })
    .animate({marginLeft: "0px", marginTop: "0px"},300, function(){
      $(this).css({
        backgroundPosition: "0px 0"
      })
    })

  opponent.delay(1)
      .transition({ rotate: '-12deg' })
      .delay(5)
      .transition({ rotate: '5deg' })
      .transition({ rotate: '0deg' });
};

$(function(){
  setTimeout(function(){
    punchFor();
  }, 500)
  setTimeout(function(){
    punchAgainst();
  }, 1000)

  var buttonFor = $('#button_for');
  var buttonAgainst = $('#button_against');

  buttonFor.on("click", function(e){
    console.log("works");
    punchFor();
  });
  buttonAgainst.on("click", function(e){
    console.log("works");
    punchAgainst();
  });
});