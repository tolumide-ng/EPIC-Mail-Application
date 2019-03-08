<<<<<<< HEAD
/* credit: all modals is gotten from w3schools */
/* global document */
const registerModal = document.getElementById('signupModal');

/* Get the button that opens the modal */
const openReset = document.getElementById('open-reset-modal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
openReset.onclick = function reset() {
  registerModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function closeReset() {
  registerModal.style.display = 'none';
};
=======
// Get the modal
var registerModal = document.getElementById('signupModal');

// Get the button that opens the modal
var openReset = document.getElementById("open-reset-modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
openReset.onclick = function() {
  registerModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  registerModal.style.display = "none";
}
>>>>>>> ch-setup-project-dependencies
