$(document).ready(function() {
  $('#home').on('click', function() {
    $('div.panel').animate({
      'width': 'show'
    }, 1000, function() {
      $('div.home').fadeIn(500);
    });
  });



  $('span.close').on('click', function() {
    $('div.home').fadeOut(500, function() {
      $('div.panel').animate({
        'width': 'hide'
      }, 1000);
    });
  });
});