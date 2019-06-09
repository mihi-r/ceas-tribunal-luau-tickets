import getInfo from './info-view.js';

getInfo();
const birthdayInput = document.querySelector('.selection-intro #birth-date');

birthdayInput.onkeyup = function onBirthdayInputType(event) {
  if ((birthdayInput.value.length === 2 || birthdayInput.value.length === 5)
  && birthdayInput.value !== ''
  && event.key !== 'Backspace') {
    birthdayInput.value += '/';
  }
};
