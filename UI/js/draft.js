function openNav() {
    document.getElementById("responsive-sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("responsive-sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

let timeOut = 4000;
let drafModal = document.getElementById("draftModal");

// Get the button that opens the modal
let openDraft = document.getElementById("open-draft");
let span = document.getElementsByClassName("close")[0];

openDraft.onclick= function(){
	drafModal.style.display = "block";
}
span.onclick= function(){
	drafModal.style.display = "none";
}

