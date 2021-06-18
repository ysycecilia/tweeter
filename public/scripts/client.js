/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    $(".tweets-container").prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweet) {
  const safetext = escape(tweet.content.text);
  const $tweet = `
  <article>
    <header class="tweet-header">
      <div class="tweet-info">
        <img src=${tweet.user.avatars}>
        <p>${tweet.user.name}</p>
      </div class="tweet-handler">
      <div >${tweet.user.handle}</div>
    </header>
    <p> ${safetext}</p>
    <footer class="tweet-footer">
    <div>${timeago.format(tweet.created_at)}</div>
    <div id="icons">
      <i class="fas fa-flag shadow"></i>              
      <i class="fas fa-retweet shadow"></i>             
      <i class="fas fa-heart shadow"></i>
    </div>
    </footer>
  </article>`;

  return $tweet;
};

//prevent Cross-Site Scripting and by rendering text
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
};



$(document).ready(function() {
  // add an event listener for the submit event
  $(".compose-tweet").submit(function(event) {
  //prevent the default behaviour(data submission and page refresh)
    event.preventDefault();

    const $tweetLength = $('.tweet-text').val().length;
    const $tweetText = $('.tweet-text', this).val();
    const $error = $(".err-message");

    $(".tweet-text").focus(function() {
      $error.hide();
      $(".submit-tweet").attr("disabled", false);
    });

    if (!$tweetText || $tweetLength === 0) {
      $error.text("Tweet can not be empty!");
      $error.slideDown("slow");
      $error.css({
        display: 'block',
        border: 'solid red 1px',
        color: 'red'
      });
      
      $(".submit-tweet").attr("disabled", true);
      return;

    } else if ($tweetLength > 140) {
      $error.text("Your tweet must under 140 characters!");
      $error.slideDown("slow");
      $error.css({
        display: 'block',
        border: 'solid red 1px',
        color: 'red'
      });
      $(".submit-tweet").attr("disabled", true);
      return;

    } else {
      //an AJAX POST request sends form data to server
      $.ajax({
        url: "/tweets",
        method: "POST",
        //turns a set of form data into a query string
        data: $(this).serialize(),
        success: function() {
        // reload updated tweets if successed
          loadtweets();
          // clear the client side
          $(".tweet-text").val("");
          $('.counter').text(140);
        }
      });
    }
  });
});

$(document).ready(function() {
  $(".toTopBtn").click(function() {
    console.log("hhhhhhhh");
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
  });
});

const loadtweets = function() {
  $.ajax("/tweets", {
    method: 'GET'
  })
    .then(res =>{
      console.log(res);
      $(".tweets-container").empty();
      renderTweets(res);
    });
};

loadtweets();
