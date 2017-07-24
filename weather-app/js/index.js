var tempUnit = "F";
$("#toggleTemp").on("click", function() {
  if(tempUnit == "F") {
    $("#Temp").html(Math.round((temp - 32) * 5/9) + "&deg C");
    tempUnit = "C";
  }
  else {
    $("#Temp").html(Math.round(temp) + "&deg F");
    tempUnit = "F";
  }
});
function getWeather(json) {
  icon = json.currently.icon;
  if(icon == "clear-day" || icon == "clear-night") {
    $("body").css("background-image", "url('http://www.youwall.com/wallpapers/201207/sunny-day-wallpaper-1440x900.jpg')");
  }
  else if(icon == "rain" || icon == "sleet") {
    $("body").css("background-image", "url('http://52.24.98.51/wp-content/uploads/2017/03/rain.jpg')");
  }
  else if(icon == "fog" || icon == "cloudy" || icon == "partly-cloudy-day" || icon == "partly-cloudy-night") {
    $("body").css("background-image", "url('http://www.weatherwizkids.com/wp-content/uploads/2015/04/fog6.jpg')");
  }
  else if(icon == "snow") {
    $("body").css("background-image", "url('http://www.lewistonmaine.gov/images/pages/N541/SNOW.jpg')");
  }
  else {
    $("body").css("background-image", "url('http://www.streampointacupuncture.com/wp-content/uploads/2014/06/blowing_in_the_wind__2896x1348.jpg')");
  }
  $("#Weather").html(json.currently.summary);
  temp = json.currently.temperature;
  $("#Temp").html(Math.round(temp) + "&deg F");
}
$(document).ready(function() {
  console.log("Loading Page...");
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    console.log("lat: " + lat);
    var long = position.coords.longitude;
    console.log("long" + long);
    site = "https://crossorigin.me/https://api.darksky.net/forecast/be53896f50e562397d410b599514231b/" + lat + "," + long;
    console.log(site);
    $.getJSON(site).done(getWeather);
    
  });
});