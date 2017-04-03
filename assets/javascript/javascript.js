// Firebase Database Data - GET
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
  // This function calls the database and displays 
  // the stored info in the recent search history
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
  // Button Firebase Data - PUSH
  $(".pushBtn").on("click", function(event) {
    event.preventDefault();
    var query = $("#placeName").val().trim();
    console.log(query);
    console.log("hello");
    database.ref().push({
      query:query,
    });
  });
  // Button - Weather API
  $("#weather").on("click", function(event) {
    event.preventDefault();
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var query = $("#placeName").val().trim();
    query = "England,London";
    $("#display_2").empty();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
          "q="+ query +"&appid=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      console.log(response);
      var city = $("<div class='city'></div>");
      var wind = $("<div class='wind'></div>");
      var humidity = $("<div class='humidity'></div>");
      var temp = $("<div class='temp'></div>");
      $("#display_2").append(city);
      $("#display_2").append(wind);
      $("#display_2").append(humidity);
      $("#display_2").append(temp);
      $(".city").html("<h2>" + response.name + " Weather Details</h2>");
      $(".wind").html("Wind Speed: " + response.wind.speed);
      $(".humidity").html("Humidity: " + response.main.humidity);
      $(".temp").html("Temperature (F) " + response.main.temp);
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });
  });
});
// // Button - Restaurant API
// $("#weather").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "166a433c57516f51dfab1f7edaed8413";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
//         "q="+ query +"&appid=" + APIKey;
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
//     var city = $("<div class='city'></div>");
//     var wind = $("<div class='wind'></div>");
//     var humidity = $("<div class='humidity'></div>");
//     var temp = $("<div class='temp'></div>");
//     $("#display_2").append(city);
//     $("#display_2").append(wind);
//     $("#display_2").append(humidity);
//     $("#display_2").append(temp);
//     $(".city").html("<h2>" + response.name + " Weather Details</h2>");
//     $(".wind").html("Wind Speed: " + response.wind.speed);
//     $(".humidity").html("Humidity: " + response.main.humidity);
//     $(".temp").html("Temperature (F) " + response.main.temp);
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//   });
// });

// // Button - Google Translator API
// $("#translate").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "166a433c57516f51dfab1f7edaed8413";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
//         "q="+ query +"&appid=" + APIKey;
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
//     var city = $("<div class='city'></div>");
//     var wind = $("<div class='wind'></div>");
//     var humidity = $("<div class='humidity'></div>");
//     var temp = $("<div class='temp'></div>");
//     $("#display_2").append(city);
//     $("#display_2").append(wind);
//     $("#display_2").append(humidity);
//     $("#display_2").append(temp);
//     $(".city").html("<h2>" + response.name + " Weather Details</h2>");
//     $(".wind").html("Wind Speed: " + response.wind.speed);
//     $(".humidity").html("Humidity: " + response.main.humidity);
//     $(".temp").html("Temperature (F) " + response.main.temp);
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//   });
// });

// // Button - Google Maps API
// $("#transport").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "166a433c57516f51dfab1f7edaed8413";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
//         "q="+ query +"&appid=" + APIKey;
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
//     var city = $("<div class='city'></div>");
//     var wind = $("<div class='wind'></div>");
//     var humidity = $("<div class='humidity'></div>");
//     var temp = $("<div class='temp'></div>");
//     $("#display_2").append(city);
//     $("#display_2").append(wind);
//     $("#display_2").append(humidity);
//     $("#display_2").append(temp);
//     $(".city").html("<h2>" + response.name + " Weather Details</h2>");
//     $(".wind").html("Wind Speed: " + response.wind.speed);
//     $(".humidity").html("Humidity: " + response.main.humidity);
//     $(".temp").html("Temperature (F) " + response.main.temp);
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//   });
// });

// // Button - Currency Exchange API
// $("#currency").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "166a433c57516f51dfab1f7edaed8413";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
//         "q="+ query +"&appid=" + APIKey;
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
//     var city = $("<div class='city'></div>");
//     var wind = $("<div class='wind'></div>");
//     var humidity = $("<div class='humidity'></div>");
//     var temp = $("<div class='temp'></div>");
//     $("#display_2").append(city);
//     $("#display_2").append(wind);
//     $("#display_2").append(humidity);
//     $("#display_2").append(temp);
//     $(".city").html("<h2>" + response.name + " Weather Details</h2>");
//     $(".wind").html("Wind Speed: " + response.wind.speed);
//     $(".humidity").html("Humidity: " + response.main.humidity);
//     $(".temp").html("Temperature (F) " + response.main.temp);
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//   });
// });

// // Button - Events API
// $("#events").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "166a433c57516f51dfab1f7edaed8413";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
//         "q="+ query +"&appid=" + APIKey;
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
//     var city = $("<div class='city'></div>");
//     var wind = $("<div class='wind'></div>");
//     var humidity = $("<div class='humidity'></div>");
//     var temp = $("<div class='temp'></div>");
//     $("#display_2").append(city);
//     $("#display_2").append(wind);
//     $("#display_2").append(humidity);
//     $("#display_2").append(temp);
//     $(".city").html("<h2>" + response.name + " Weather Details</h2>");
//     $(".wind").html("Wind Speed: " + response.wind.speed);
//     $(".humidity").html("Humidity: " + response.main.humidity);
//     $(".temp").html("Temperature (F) " + response.main.temp);
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//   });
// });

// // Button - News API
// $("#news").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "166a433c57516f51dfab1f7edaed8413";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
//         "q="+ query +"&appid=" + APIKey;
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
//     var city = $("<div class='city'></div>");
//     var wind = $("<div class='wind'></div>");
//     var humidity = $("<div class='humidity'></div>");
//     var temp = $("<div class='temp'></div>");
//     $("#display_2").append(city);
//     $("#display_2").append(wind);
//     $("#display_2").append(humidity);
//     $("#display_2").append(temp);
//     $(".city").html("<h2>" + response.name + " Weather Details</h2>");
//     $(".wind").html("Wind Speed: " + response.wind.speed);
//     $(".humidity").html("Humidity: " + response.main.humidity);
//     $(".temp").html("Temperature (F) " + response.main.temp);
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//   });
// });