/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// renderTweets function loops over the arrOfTweetOBj and show the latest tweet on top.
const renderTweets = function(arrOfTweetObj) {
  $('.tweet-container').html(""); // to prevent rendering duplicate tweets
  for (const tweetData of arrOfTweetObj.reverse()) { 
    const $tweet = createTweetElement(tweetData);
    $('.tweet-container').append($tweet); // add latest tweet to the end of the container.
  }
};

// Helper function
const escaped = function (str) { //Safety layer to protect data that implemented in line 31-32-35-39-42
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  
  // For dynamic tweets instead of hard-coded ones. Switched to html w/ using jQuery
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="user-info">
        <img src="${escaped(tweet.user.avatars)}" />
        <span>${escaped(tweet.user.name)}</span>
      </div>
      <div class="user-handle">
       <span>${escaped(tweet.user.handle)}</span>
      </div>
    </header>
    <div class="tweet-body">
      <p>${escaped(tweet.content.text)}</p>
    </div>
    <footer>
      <div>${escaped(timeago.format(tweet.created_at))}</div> 
      <div class="social-media-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
  return $tweet;
};


$(document).ready(function () {

  function loadTweets() { // loading tweets w/ get method using Ajax
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
  }

  $("#new-tweet").on("submit", function(event) { //event listener for submitting tweet with conditions

    if ($("#tweet-text").val().length > 140) { // To check if the text area is empty or the text is too long. 
      $('.error-message').text("⚠️ Message is too long ⚠️");
      $('.error-message').css("display", "block"); //to show the error message in a box
    } else if ($("#tweet-text").val().length === 0) {
      $('.error-message').text("⚠️ Message is empty! ⚠️");
      $('.error-message').css("display", "block"); //to show the error message in a box
    } else {
      const serializedData = $("#new-tweet").serialize(); //To convert to URL parameters
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: serializedData,
      })
      .done(function (data) { // to load new tweet on top of the tweet-text area. Before .done function the server could not response on time. 
        $("#tweet-text").val("") // Clear tweet input area
        $('.counter').val(140); // reset char counter to 140 chars
        loadTweets();
      });
    }

    event.preventDefault();
  });

  loadTweets();
});