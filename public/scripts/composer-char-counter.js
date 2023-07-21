// To check length of the tweet and change text color after 140 characters.

$(document).ready(function() {
  $('textarea').on('keyup', function () {
    $('.counter').val(140 - $(this).val().length);
    if ($('.counter').val() < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }    
    });
});