$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4--ZESUcCB5-DEBQCduxoJN97o_RHFBU",
    authDomain: "train-time-90011.firebaseapp.com",
    databaseURL: "https://train-time-90011.firebaseio.com",
    projectId: "train-time-90011",
    storageBucket: "",
    messagingSenderId: "925454807530"
  };
  firebase.initializeApp(config);
  console.log(config);

  var database = firebase.database();

    $("#add-user").on("click", function(event){
        event.preventDefault();
        var name = $("#name-input").val()
        var destination = $("#destination-input").val()
        var time = $("#time-input").val()
        var frequency = $("#frequency-input").val()
        
        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: frequency,
        })
    });
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    var away = childSnapshot.val().frequency
    var format = "hh:mm"
    var military = childSnapshot.val().time
    var arrival = moment( military, format)
   // need to update arrival time
// if (arrival === moment().format("hh:mm a")){
//    military = time + away

// }

    $(".display").append("<tr><th id='name'>" + childSnapshot.val().name + 
    "</th><td class='destination'>" + childSnapshot.val().destination + 
    "</td><td class='frequency'>" + childSnapshot.val().frequency +
    "</td><td class='time'>" + moment(arrival).format("h:mm a") + 
     "</td><td class='months'>" + moment().diff(moment(arrival), "mm") + 
     "</td></tr>")
});
});
