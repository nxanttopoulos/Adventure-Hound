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
      if (data === dataArray[i-2]) {
        console.log(dataArray);
        dataArray.pop();
        dataArray.pop();
        console.log(dataArray);
      } else if (data === dataArray[i-1]) {
        console.log(dataArray);
        dataArray.pop();
        console.log(dataArray);
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
    if (query === "") {
      return;
    } else {
      database.ref().push({
        query:query,
      });
    }
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
      var conditions = response.weather;
      var forecast = conditions[0];
      var Fahrenheit = parseInt((kelvin-273.15) * 1.80 + 32);
      var city = $("<div class='city'></div>");
      var wind = $("<div class='wind'></div>");
      var humidity = $("<div class='humidity'></div>");
      var temp = $("<div class='temp'></div>");
      var cloud = $("<div class='cloud'></div>");
      var rain = $("<div class='rain'></div>");
      $("#display_2").append(city);
      $("#display_2").append(temp);
      $("#display_2").append(wind);
      $("#display_2").append(humidity);
      $("#display_2").append(rain);
      $(".city").html("<h2>" + response.name + " - Weather Details</h2>");
      $(".temp").html("Today's Forecast: " + forecast.description);
      $(".rain").html("Temperature: "+ Fahrenheit + " (F)");
      $(".wind").html("Wind Speed: " + response.wind.speed + " (MPH) ");
      $(".humidity").html("Humidity: " + response.main.humidity+"%");
      $(".cloud").html("Cloudiness: "+ response.clouds.all+"%");
    });
    // This will be for a weekly forecast as well once decide on the layout.
    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" +
    //       "q="+ query +"&appid=" + APIKey;
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // })
    // .done(function(response) {
    //   // var kelvin = response.main.temp;
    //   // var Fahrenheit = (kelvin-273.15) * 1.80 + 32;
    //   var forecast = $("<div class='forecast'></div>");
    //   var forecastM= $("<div class='mon'></div>");
    //   var forecastT = $("<div class='tues'></div>");
    //   var forecastW = $("<div class='wed'></div>");
    //   var forecastH = $("<div class='thurs'></div>");
      // $("#display_2").append(forecast);
      // $("#display_2").append(forecastT);
      // $("#display_2").append(forecastW);
      // $("#display_2").append(forecastH);
      // $(".mon").html("<h3>" + response.city.name + " - Weekly Forecast</h3>");
      // $(".tues").html("Today's Forecast: " + Fahrenheit);
      // $(".wed").html("Wind Speed: " + response.wind.speed);
      // $(".thurs").html("Humidity: " + response.main.humidity);
    // });
  });
  // Button - Currency Exchange API 
  $("#currency").on("click", function(event) {
    event.preventDefault();
    var query = $("#placeName").val().trim();
    $("#display_2").empty();
    var ratesDivHead = $("<div class='rateH'></div>");
    $("#display_2").append(ratesDivHead);
    $(".rateH").html("<h2>Exchange Rates:<form><input type='text' class ='form control' id='base-query' placeholder='USD'></form><button type='button' id='changeRate'>Submit</button></h2>");
    $("#changeRate").on("click", function(event) {
      $(".displayRates").remove();
      var baseQuery = $("#base-query").val().trim();
      if (baseQuery === "") {
        var base = 'USD';
      } else {
        var base = baseQuery;
      }
      var queryURL = "http://api.fixer.io/latest?base="+base;
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        var ratesObj = response.rates;
        var exchangeRates = JSON.stringify(response.rates);
        var ratesDivBody1 = $("<table class ='displayRates' id='rateB1'></table>");
        var ratesDivBody2 = $("<table class ='displayRates' id='rateB2'></table>");
        var ratesDivBody3 = $("<table class ='displayRates' id='rateB3'></table>");
        var ratesDivBody4 = $("<table class ='displayRates' id='rateB4'></table>");
        var ratesDivBody5 = $("<table class ='displayRates' id='rateB5'></table>");
        var ratesDivBody6 = $("<table class ='displayRates' id='rateB6'></table>");
        var tableRow = $("<tr></tr>");
        $("#display_2").append(ratesDivBody1);
        $("#display_2").append(ratesDivBody2);
        $("#display_2").append(ratesDivBody3);
        $("#display_2").append(ratesDivBody4);
        $("#display_2").append(ratesDivBody5);
        $("#display_2").append(ratesDivBody6);
        var ratesArray = [];
        for (var key in ratesObj) {
          var keysArray = Object.keys(ratesObj);  
          ratesArray.push(ratesObj[key]);
        }
        for (i=0; i < 15; i++) {
          var tableRow = $("<tr></tr>");
          $("#rateB1").append(tableRow);
          tableRow.append("<td>"+keysArray[i]+"</td>");
        }
        for (i=0; i < 15; i++) {
          var tableRow = $("<tr></tr>");
          $("#rateB2").append(tableRow);
          tableRow.append("<td> $"+ratesArray[i]+"</td>");
        }
        for (i=15; i < 30; i++) {
          var tableRow = $("<tr></tr>");
          $("#rateB3").append(tableRow);
          tableRow.append("<td>"+keysArray[i]+"</td>");
        }
        for (i=15; i < 30; i++) {
          var tableRow = $("<tr></tr>");
          $("#rateB4").append(tableRow);
          tableRow.append("<td> $"+ratesArray[i]+"</td>");
        }
        for (i=30; i < keysArray.length; i++) {
          var tableRow = $("<tr></tr>");
          $("#rateB5").append(tableRow);
          tableRow.append("<td>"+keysArray[i]+"</td>");
        }
        for (i=30; i < ratesArray.length; i++) {
          var tableRow = $("<tr></tr>");
          $("#rateB6").append(tableRow);
          tableRow.append("<td> $"+ratesArray[i]+"</td>");
        }
      });
    });
  });
});


// // Button - Google Translator API
// $("#translate").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "" + APIKey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .done(function(response) {
//     console.log(response);
//   });
// });
// // Button - Google Maps API
// $("#transport").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "" + APIKey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .done(function(response) {
//     console.log(response);
//   });
// });
// // Button - Restaurant API
// $("#restaurants").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "" + APIKey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .done(function(response) {
//     console.log(response);
//   });
// });
// // Button - Events API
// $("#events").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "" + APIKey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .done(function(response) {
//     console.log(response);
//   });
// });
// // Button - News API
// $("#news").on("click", function(event) {
//   event.preventDefault();
//   var APIKey = "";
//   var query = $("#placeName").val().trim();
//   $("#display_2").empty();
//   var queryURL = "" + APIKey;
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   .done(function(response) {
//     console.log(response);
//   });
// });