var punchFor = function(){
  var forFist = $('#for_fist_front');
  var opponent = $("#fighter2");
  var opponent2 = $("#empty_column2");
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
    .animate({marginLeft: "-265px", marginTop: "0px"},400, function(){
      $(this).css({
        backgroundPosition: "0 0"
      })
    })
  opponent.delay(1)
      .transition({ rotate: '12deg' })
      .delay(5)
      .transition({ rotate: '-5deg' })
      .transition({ rotate: '0deg' });
  opponent2.delay(1)
      .transition({ rotate: '12deg' })
      .delay(5)
      .transition({ rotate: '-5deg' })
      .transition({ rotate: '0deg' });

};

var punchAgainst = function(){
  var againstFist = $('#against_fist_front');
  var opponent = $("#fighter1");
  var opponent2 = $("#empty_column1");
  againstFist
    .css({
      backgroundPosition: "0 -148px",
      width: "404px"
      })
    .animate({marginLeft: "-400px", marginTop: "-50px"},50, function(){
      $(this).css({
        backgroundPosition: "0px -279px",
      })
    })
    .delay(60)
    .animate({marginLeft: "0px", marginTop: "0px"},400, function(){
      $(this).css({
        backgroundPosition: "0 0"
      })
    })
  opponent.delay(1)
      .transition({ rotate: '-12deg' })
      .delay(5)
      .transition({ rotate: '5deg' })
      .transition({ rotate: '0deg' });
  opponent2.delay(1)
      .transition({ rotate: '-12deg' })
      .delay(5)
      .transition({ rotate: '5deg' })
      .transition({ rotate: '0deg' });

};

$(function(){
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