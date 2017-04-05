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
  var dataArray = [];
    snapshot.forEach(function (child) { 
      var childData = child.val();
      dataArray.push(childData.query);
    });
    // This loop keeps the search history from displaying duplicates searched
    for (i=0; i < dataArray.length; i++) {
      var tableRow = $("<tr id='data"+[i]+"' class='trow'></tr>");
      var data = dataArray[i];
      // console.log(dataArray);
      // console.log(data);
      if (data === dataArray[i-1]) {
        dataArray.pop();
      } else {
        $(".table").append(tableRow);
        tableRow.append("<td id='queries'>"+dataArray[i]+"</td>");
      }
    }
  });
  // Button Firebase Data - PUSH
  $(".pushBtn").on("click", function(event) {
    event.preventDefault();
    var query = $("#placeName").val().trim();
    database.ref().push({
      query:query,
    });
  });
  // Button - Weather API
  $("#weather").on("click", function(event) {
    event.preventDefault();
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var query = $("#placeName").val().trim();
    $("#display_2").empty();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
          "q="+ query +"&appid=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var kelvin = response.main.temp;
      var Fahrenheit = (kelvin-273.15) * 1.80 + 32;
      var city = $("<div class='city'></div>");
      var wind = $("<div class='wind'></div>");
      var humidity = $("<div class='humidity'></div>");
      var temp = $("<div class='temp'></div>");
      $("#display_2").append(city);
      $("#display_2").append(wind);
      $("#display_2").append(humidity);
      $("#display_2").append(temp);
      $(".city").html("<h2>" + response.name + " - Weather Details</h2>");
      $(".wind").html("Wind Speed: " + response.wind.speed);
      $(".humidity").html("Humidity: " + response.main.humidity);
      $(".temp").html("Temperature (F) " + Fahrenheit);
    });
  });
  // Button - Currency Exchange API 
  $("#currency").on("click", function(event) {
    event.preventDefault();
    var query = $("#placeName").val().trim();
    $("#display_2").empty();
    var queryURL = "http://api.fixer.io/latest?base=USD";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var ratesObj = response.rates;
      var exchangeRates = JSON.stringify(response.rates);
      var ratesDivHead = $("<div class='rateH'></div>");
      var ratesDivBody1 = $("<table id='rateB1'></table>");
      var ratesDivBody2 = $("<table id='rateB2'></table>");
      var tableRow = $("<tr></tr>");
      $("#display_2").append(ratesDivHead);
      $("#display_2").append(ratesDivBody1);
      $("#display_2").append(ratesDivBody2);
      $(".rateH").html("<h2>ExchangeRates"+response.base+"("+response.date+")</h2>");
      var ratesArray = [];
      for (var key in ratesObj) {
        var keysArray = Object.keys(ratesObj);  
        ratesArray.push(ratesObj[key]);
      }
      // console.log(keysArray);
      // console.log(ratesArray);
      for (i=0; i < keysArray.length; i++) {
        var tableRow = $("<tr></tr>");
        $("#rateB1").append(tableRow);
        tableRow.append("<td>"+keysArray[i]+"</td>");
      }
      for (i=0; i < ratesArray.length; i++) {
        var tableRow = $("<tr></tr>");
        $("#rateB2").append(tableRow);
        tableRow.append("<td> $"+ratesArray[i]+"</td>");
      }
    });
  });
});


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
//   });
// });

// // Button - Restaurant API
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
//   });
// });