// for the responsive side bar
function openNav() {
    document.getElementById("responsive-sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("responsive-sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  //for fetch api
document.getElementById('inbox').addEventListener('click',getInboxMessages);

  function getInboxMessages(){
fetch('http://localhost:5000/api/v2/messages',{
  method: 'GET',
  headers: new Headers({
    'content-type':'application/json',
    'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdib2h1bm1pLm93b3NvQGVwaWMuY29tIiwiaWQiOjIsImlhdCI6MTU1MzYxMDg4NSwiZXhwIjoxNTUzNjk3Mjg1fQ.OPlx0gy_YZxKVtOIgDau6tjMR2s3gWnh5XhB9ROAD7E'
  })
})
  .then(function(response) {
    return response.json();
  }).then(function(text) { 
  	// <!DOCTYPE ....
  	console.log(text); 
  });
}
setTimeout(getInboxMessages,50000000);