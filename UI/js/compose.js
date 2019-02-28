// Get the modal
let feedbakModal = document.getElementById('feedbackModal');

// Get the button that opens the modal
let openFeedback = document.getElementById("open-feedback");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let span1 = document.getElementsByClassName("close1")[0];

let retract = document.getElementById("retract");

let save = document.getElementById("saveModal");
let saveFeedback = document.getElementById("save-feedback");

// When the user clicks on the button, open the modal 
openFeedback.onclick = function() {
  feedbakModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
let timeOut = 4000;

span.onclick = function() {
  feedbakModal.style.display = "none";
}
span1.onclick = function() {
  save.style.display = "none";
}

retract.onclick= function(){
	feedbakModal.style.display = "none";
}

setTimeout(function(){
  feedbakModal.style.visibility = 'hidden';
  }, timeOut);

saveFeedback.onclick = function(){
	save.style.display = "block"
}
setTimeout(function(){
  save.style.visibility = 'hidden';
  }, timeOut);