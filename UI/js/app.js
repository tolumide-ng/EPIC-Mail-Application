/* Idea of modal gotten from w3schools and stack overflow.  */
//declare a variable to save time out in milliseconds
const signupTimeOut = 4000;

/*-------- for sign up modal -----*/
//get the id of the modal to be displayed
let signUpModal = document.getElementById('signUpModal');

//call the function to display the sign up modal
if(typeof(signUpModal) !='undefined' && signUpModal !=null)
{
function openSignUpModal(){

  signUpModal.style.display = 'block';
}

//call the function to hide sign up modal after some time
setTimeout(function(){
  signUpModal.style.visibility = 'hidden';
  }, signupTimeOut);
/*-------- for sign up modal -----*/
}

//declare a variable to save time out in milliseconds
let resetPasswordTimeOut = 5000;

/*-------- for reset password modal -----*/
//get the id of the modal to be displayed
let resetPwordModal = document.getElementById('resetPasswordModal');
if(typeof(resetPwordModal) !='undefined' && resetPwordModal !=null)
{
//call the function to display the sign up modal
function openResetPasswordModal(){
  resetPwordModal.style.display = 'block';
}

//call the function to hide sign up modal after some time
setTimeout(function(){
  resetPwordModal.style.visibility = 'hidden';
  }, resetPasswordTimeOut);
}
/*-------- for reset password modal -----*/

/*-----------------------------------------------------*/
let timeOut = 5000;
let shwSendMailModal = document.getElementById('show-send-mail-panel');
if(typeof(shwSendMailModal) !='undefined' && shwSendMailModal !=null)
{
	function showSendMailPanel(){
  shwSendMailModal.style.display = 'block';
}

//call the function to hide sign up modal after some time
setTimeout(function(){
  shwSendMailModal.style.visibility = 'hidden';
  }, timeOut);
}
