
let inbox = document.getElementById('inbox');
let compose = document.getElementById('compose');

function openComposeMail(){
compose.style.display = 'block';
inbox.style.display = 'none';
}

function openNav() {
    document.getElementById("responsive-sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("responsive-sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }