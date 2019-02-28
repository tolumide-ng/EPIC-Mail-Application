// Get the modal
let feedbakModal = document.getElementById('feedbackModal');

// Get the button that opens the modal
let openFeedback = document.getElementById("open-feedback");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let retract = document.getElementById("retract");

// When the user clicks on the button, open the modal 
openFeedback.onclick = function() {
  feedbakModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  feedbakModal.style.display = "none";
}

retract.onclick= function(){
	feedbakModal.style.display = "none";
}