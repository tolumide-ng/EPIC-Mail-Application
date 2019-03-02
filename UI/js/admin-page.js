/* credit: all modals is gotten from w3schools */
/* global document */
const cgModal = document.getElementById('createGroupModal');
const createButton = document.getElementById('create-group-button');
const span = document.getElementsByClassName('close')[0];

createButton.onclick = function showAdminModal() {
  cgModal.style.display = 'block';
};

span.onclick = function hideAdminModal() {
  cgModal.style.display = 'none';
};
