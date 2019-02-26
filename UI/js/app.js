/* Idea of modal gotten from w3schools and stack overflow */
//declare a variable to save time out in milliseconds
var signupTimeOut = 4000;

/*-------- for sign up modal -----*/
//get the id of the modal to be displayed
var signUpModal = document.getElementById('signUpModal');

//call the function to display the sign up modal
function openSignUpModal(){
  signUpModal.style.display = 'block';
}

//call the function to hide sign up modal after some time
setTimeout(function(){
  signUpModal.style.visibility = 'hidden';
  }, signupTimeOut);
/*-------- for sign up modal -----*/

//declare a variable to save time out in milliseconds
var resetPasswordTimeOut = 5000;

/*-------- for reset password modal -----*/
//get the id of the modal to be displayed
var resetPwordModal = document.getElementById('resetPasswordModal');

//call the function to display the sign up modal
function openResetPasswordModal(){
  resetPwordModal.style.display = 'block';
}

//call the function to hide sign up modal after some time
setTimeout(function(){
  resetPwordModal.style.visibility = 'hidden';
  }, resetPasswordTimeOut);
/*-------- for reset password modal -----*/

/*-----------------------------------------------------*/