/* eslint-disable no-undef */
/* eslint-disable func-names */

$(document).ready(function() {
  $("textarea").on('input',function() {
    let leng = $(this).val().length;
    let charCount = 140 - leng;
   
    if (charCount < 0) {
      $(".counter").css("color","red");
    } else {
      $(".counter").css("color", "black");
    }

    $(".counter").val(charCount);
  });

});