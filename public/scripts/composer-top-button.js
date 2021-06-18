/* eslint-disable no-undef */
$(document).ready(function() {
  $(".toTopBtn").click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
  });
});