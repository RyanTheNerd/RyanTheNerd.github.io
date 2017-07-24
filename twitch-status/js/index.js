var twitchURL = "https://wind-bow.gomix.me/twitch-api/";
var twitchArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
var html = "";
count = 1;
for(let x = 0; x < twitchArray.length; x++) {
  count++;
  if(!count % 3) {
    html += "<div class='row'>";
  }
  $.getJSON(twitchURL + "streams/" + twitchArray[x] + "?callback=?", function(user) {
    html += "<div class='col-md-4'><h2>" + twitchArray[x] + "</h2>";
    if(user.stream) {
      html += "<a href='http://twitch.tv/" + twitchArray[x]  + "'  target='_blank'><p>Streaming: " + user.stream.game + "</p></a></div>";
    }
    else {
      html += "<a href='http://twitch.tv/" + twitchArray[x] + "' target='blank'><p class='" + twitchArray[x] + "'>Not Streaming</p></a></div>";
    }
    $(".streamingList").html(html);
  });
  if(!count % 3) {
    html += "<div class='col-md-4'>";
  }
}
for(let x = 0; x < twitchArray.length; x++) {
$.getJSON(twitchURL + "users/" + twitchArray[x] + "?callback=?", function(user) {
    console.log(user.error);
    if(user.error == "Not Found") {
      $("." + twitchArray[x]).html("User doesn't exist.");
    }
  });
}