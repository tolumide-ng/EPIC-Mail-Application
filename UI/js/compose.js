/* credit: all modals is gotten from w3schools */
/* global document */
const feedbakModal = document.getElementById('feedbackModal');
const openFeedback = document.getElementById('open-feedback');

/* Get the <span> element that closes the modal */
const span = document.getElementsByClassName('close')[0];
const span1 = document.getElementsByClassName('close1')[0];
const retract = document.getElementById('retract');
const save = document.getElementById('saveModal');
const saveFeedback = document.getElementById('save-feedback');

openFeedback.onclick = function showFeedbackModal() {
  feedbakModal.style.display = 'block';
};

span.onclick = function close() {
  feedbakModal.style.display = 'none';
};
span1.onclick = function close1() {
  save.style.display = 'none';
};

retract.onclick = function closeSendModal() {
  feedbakModal.style.display = 'none';
};

saveFeedback.onclick = function showSaveModal() {
  save.style.display = 'block';
};
