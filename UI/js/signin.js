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
