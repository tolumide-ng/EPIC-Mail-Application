document.getElementById('inbox').addEventListener('click',getInboxMessages);
function getInboxMessages(){
  fetch('http://localhost:5000/api/v2/messages',{
    method: 'GET',
    headers: new Headers({
      'content-type':'application/json',
    })
  })
  .then((res) => {
    console.log(res.text());
  })
}
setTimeout(getInboxMessages,5000000);