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

//idea for search table function is gotten from w3schools
function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
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
/*----------------end of inbox----*/