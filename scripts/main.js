import getInfo from './info-view.js';

getInfo();

const birthdayInput = document.querySelector('.intro #birth-date');

/**
 * Adds forward slashes for the birth date input
 * @param {object} event - The action for key up
 */
birthdayInput.onkeyup = function onBirthdayInputType(event) {
  if ((birthdayInput.value.length === 2 || birthdayInput.value.length === 5)
  && birthdayInput.value !== ''
  && event.key !== 'Backspace') {
    birthdayInput.value += '/';
  }
};
