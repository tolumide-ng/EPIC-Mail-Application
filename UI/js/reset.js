//credit: all modals is gotten from w3schools
// Get the modal
let registerModal = document.getElementById('signupModal');

// Get the button that opens the modal
let openReset = document.getElementById("open-reset-modal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let oldpwd = document.getElementById("oldpwd");
let newpwd = document.getElementById("newpwd");
let cnewpwd = document.getElementById("cnewpwd");

// When the user clicks on the button, open the modal 
openReset.onclick = function() {
  if (oldpwd.value !="" || newpwd.value !="" || cnewpwd.value !=""){
  registerModal.style.display = "block";
  }
  else{
    registerModal.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  registerModal.style.display = "none";
}