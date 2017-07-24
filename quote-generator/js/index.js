function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function generateQuote() {
  $.getJSON(quoteBank, function(json) {
      console.log("json");
      pickedQuote = json[randomInt(0, 5000)];
      $("#Quote").html(pickedQuote.quoteText);
      $("#Author").html("- " + (pickedQuote.quoteAuthor || "Unknown"));
      $(".twitter-share-button").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(pickedQuote.quoteText + "\n- " + pickedQuote.quoteAuthor));
    });
}
console.log("this works");
quoteBank = "https://cdn.rawgit.com/4skinSkywalker/Database-Quotes-JSON/418d77f9/quotes.json";
$(document).ready(function() {
  generateQuote();
  $("#generateQuote").on("click", function() {
    generateQuote();
  });
});