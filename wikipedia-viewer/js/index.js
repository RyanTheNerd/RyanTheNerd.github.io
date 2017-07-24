function populate(json) {
  var html = "";
    for(i = 0; i < json[1].length; i++) {
      html += "<a target='_blank' href='" + json[3][i] + "'>" +"<h1>" + json[1][i] + "</h1>"  + json[2][i] + "</a>"; 
    }
    console.log(html);
    $(".results").html(html);
}
$(".search").on("click", function() {
  userInput = $(".input").val();
  console.log(userInput);
  $.getJSON("https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + encodeURIComponent(userInput)).done(populate);
});