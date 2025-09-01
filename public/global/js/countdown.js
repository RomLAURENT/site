var tag = "countdown";
var countDownDate = new Date("Sep 10, 2025 00:00:00").getTime();

// Update the count down every 1 second
var countdownInterval = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in the element with id="countdown"
	var element = document.getElementById(tag);
	if (element) {
	  element.innerHTML = "Dans " + days + " jours, " + hours + " heures, "
	  + minutes + " minutes, et " + seconds + " secondes";
	}

	// If the count down is finished, write some text
	if (distance < 0) {
	  clearInterval(countdownInterval);
	  var element = document.getElementById(tag);
	  if (element) {
	    element.innerHTML = "Aujourd'hui, on résiste !";
	  }
	}
}, 1000);