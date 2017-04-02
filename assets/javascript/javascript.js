var config = {
    apiKey: "AIzaSyAmDDTXiSbcEdPhM2fBA5MQDMcw1RAcEtU",
    authDomain: "adventure-hound.firebaseapp.com",
    databaseURL: "https://adventure-hound.firebaseio.com",
    projectId: "adventure-hound",
    storageBucket: "adventure-hound.appspot.com",
    messagingSenderId: "1055802254361"
};
firebase.initializeApp(config);
var database = firebase.database(); 
$(document).ready(function() { 
  database.ref().on('value', function(snapshot) {
  $(".trow").remove();
  // console.log(snapshot.val());
    snapshot.forEach(function (child) { 
      var tableRow = $("<tr class='trow'></tr>");
      var childData = child.val();
      // console.log(childData);
      $(".table").append(tableRow);
      tableRow.append("<td>"+childData.query+"</td>");
    });
  });
});

$(".btn").on("click", function(event) {
  event.preventDefault();
  var query = $("#placeName").val().trim();
  console.log(query);
  // var tableRow = $("<tr class ='trow'></tr>");
  // $(".table").append(tableRow);
  // tableRow.append("<td>"+query+"</td>");
  // database.ref().push({
  //   query:query,
  // });
});
// $(".btn").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "166a433c57516f51dfab1f7edaed8413";
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
//         "q="+ query +"&units=imperial&appid=" + APIKey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .done(function(response) {
//     // Log the queryURL
//     console.log(queryURL);
//     // Log the resulting object
//     console.log(response);
//     // Transfer content to HTML
//     <div class="city"></div>
//     <div class="wind"></div>
//     <div class="humidity"></div>
//     <div class="temp"></div>
//     $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//     $(".wind").html("Wind Speed: " + response.wind.speed);
//     $(".humidity").html("Humidity: " + response.main.humidity);
//     $(".temp").html("Temperature (F) " + response.main.temp);
//     // Log the data in the console as well
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//   });