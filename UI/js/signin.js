<<<<<<< HEAD
/* credit: all modals is gotten from w3schools */
/* global document */
const registerModal = document.getElementById('signupModal');
const openSignup = document.getElementById('open-signup-modal');
const span = document.getElementsByClassName('close')[0];

openSignup.onclick = function signup() {
  registerModal.style.display = 'block';
};
span.onclick = function closeSignup() {
  registerModal.style.display = 'none';
};
=======
// Get the modal
var registerModal = document.getElementById('signupModal');

// Get the button that opens the modal
var openSignup = document.getElementById("open-signup-modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
openSignup.onclick = function() {
  registerModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  registerModal.style.display = "none";
}
>>>>>>> ch-setup-project-dependencies
