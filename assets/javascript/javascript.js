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
    console.log(snapshot.val());
    snapshot.forEach(function (child) { 
      var tableRow = $("<tr class='trow'></tr>");
      // var key = child.key();
      var childData = child.val();
      // console.log(key);
      console.log(childData);
      // $(".trow").empty();
      $(".table").append(tableRow);
      tableRow.append("<td>"+childData.query+"</td>");
    });
  });
});
var query = "";
$(".btn").on("click", function(event) {
  event.preventDefault();
  var query = $("#placeName").val().trim();
  console.log(query);
  var tableRow = $("<tr class ='trow'></tr>");
  $(".table").append(tableRow);
  tableRow.append("<td>"+query+"</td>");
  database.ref().push({
    query:query,
  });
});

// var queryURL = "http://www.omdbapi.com/?s=" + query + "&y=&plot=short&r=json";
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).done(function(response) {
//   console.log(response);
//   for (var i=0; i < response.Search.length; i++) {
//     console.log(response.Search[i]);
//   }
// });