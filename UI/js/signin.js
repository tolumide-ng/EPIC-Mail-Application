//credit: w3schools
// Get the modal
const registerModal = document.getElementById('signupModal');

// Get the button that opens the modal
const openSignup = document.getElementById("open-signup-modal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

let fname = document.getElementById("fname"); 
let lname = document.getElementById("lname");
let uname = document.getElementById("uname");
let pwd = document.getElementById("pwd");
let cpwd = document.getElementById("cpwd");

// When the user clicks on the button, open the modal 

openSignup.onclick = function() {
  if(fname.value != "" || lname.value != "" || uname.value != "" || pwd.value != "" || cpwd.value != ""){
  registerModal.style.display = "block";
  console.log(fname);
  }
  else{
    registerModal.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  registerModal.style.display = "none";
}
