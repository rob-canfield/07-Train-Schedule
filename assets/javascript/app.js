  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDzt8c4lw8wcLDSVFl-6rtKiTash7ifmrc",
    authDomain: "train-schedule-2e3dc.firebaseapp.com",
    databaseURL: "https://train-schedule-2e3dc.firebaseio.com",
    projectId: "train-schedule-2e3dc",
    storageBucket: "",
    messagingSenderId: "22234897843",
    appId: "1:22234897843:web:7ca2e43e27d6d837"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainInfo =  $("#train-info");

  $("#submit").on('click', function(){
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstDeparture = $("#first-departure").val().trim();
    var frequency = $("#frequency").val().trim();
    
    var newTrain = {
      name: trainName,
      destination: destination,
      departure: firstDeparture,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    }

    database.ref().push(newTrain);

    alert("congratulations. new train added succesfully.")

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-departure").val("");
    $("#frequency").val("");

  });

  database.ref().on("child_added", function(snapshot) {

    console.log(snapshot.val());

    // snapshot.forEach(function(){

      var newRow = $("<tr>").append(
       $("<td>").text(snapshot.val().name),
       $("<td>").text(snapshot.val().destination),
       $("<td>").text(snapshot.val().frequency),
       $("<td>").text(snapshot.val().name)
      );
  
  
      $("#train-info").append(newRow);
    // })
  


   
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



    // // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



