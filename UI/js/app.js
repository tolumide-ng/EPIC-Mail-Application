/* Idea of modal gotten from w3schools and stack overflow */
//declare a variable to save time out in milliseconds
const signupTimeOut = 4000;

/*-------- for sign up modal -----*/
//get the id of the modal to be displayed
let signUpModal = document.getElementById('signUpModal');

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
let resetPasswordTimeOut = 5000;

/*-------- for reset password modal -----*/
//get the id of the modal to be displayed
let resetPwordModal = document.getElementById('resetPasswordModal');

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

//idea for search table function is gotten from w3schools
function SearchTable() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/*inbox div manipulation*/
//get inbox div
var inbox = document.getElementById('inbox');
//this calls a function that opens the div with id called inbox
function openInbox(){
  inbox.style.display = 'block';
  omail.style.display = 'none';
   
}
//get opened mail div
var omail = document.getElementById('opened-mail');
function openedMail(){
  omail.style.display = 'block';
  inbox.style.display = 'none';
}
//end of opened mail modal

//for compose modal
var composeModal = document.getElementById('composeModal');
//get elements that opens compose mail modal
var openComposeModal = document.getElementById('openComposeModal');
//get element that closes compose mail modal
var closeComposeModal = document.getElementsByClassName('compose-close-btn')[0];
if(typeof(openComposeModal) !='undefined' && openComposeModal !=null)
{
openComposeModal.addEventListener('click', openModal);
}
//listen for a close click
if(typeof(closeComposeModal) !='undefined' && closeComposeModal !=null)
{
closeComposeModal.addEventListener('click', closeModal);
}

function closeModal(){
	composeModal.style.display = 'none';
}

function openModal(){
	composeModal.style.display = 'block';
}
/*----------------end of inbox----*/


function retractMessage(){
  shwSendMailPanel.style.display = 'none';
  composeModal.style.display = 'block';
}
let hideTimeOut = 6000;

//get button that shows panel
var shwSendMailPanel = document.getElementById('show-send-mail-panel');
function showSendMailPanel(){
   composeModal.style.display = 'none';
  shwSendMailPanel.style.display = 'block';
}
setTimeout(function(){
  shwSendMailPanel.style.visibility = 'hidden';
  }, hideTimeOut)