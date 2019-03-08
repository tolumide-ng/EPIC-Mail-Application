/* credit: all modals is gotten from w3schools */
/* global document */
const drafModal = document.getElementById('draftModal');
const openDraft = document.getElementById('open-draft');
const span = document.getElementsByClassName('close')[0];

openDraft.onclick = function draft() {
  drafModal.style.display = 'block';
};
span.onclick = function closeDraft() {
  drafModal.style.display = 'none';
};
