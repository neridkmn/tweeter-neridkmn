

$(document).ready(function() {
  $('textarea').on('keyup', function () {
    $('.counter').val(140 - $(this).val().length);
    if ($('.counter').val() < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
   console.log($('.counter').val());
    
    });
});