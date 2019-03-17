function openNav() {
  document.getElementById("responsive-sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("responsive-sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
// Get the modal
var cgModal = document.getElementById('createGroupModal');

// Get the button that opens the modal
var createButton = document.getElementById("create-group-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
createButton.onclick = function() {
  cgModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  cgModal.style.display = "none";
}
