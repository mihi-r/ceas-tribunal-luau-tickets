import getInfo from './info-view.js';
import reserveTicket from './reserve.js';

getInfo();

const birthdayInput = document.querySelector('.intro #birth-date');
const phoneNumberInput = document.querySelector('.intro #phone-number');

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

/**
 * Adds '-' for the phone number input
 * @param {object} event - The action for key up
 */
phoneNumberInput.onkeyup = function onPhoneNumberInputType(event) {
  if ((phoneNumberInput.value.length === 3 || phoneNumberInput.value.length === 7)
  && phoneNumberInput.value !== ''
  && event.key !== 'Backspace') {
    phoneNumberInput.value += '-';
  }
};

const formName = document.querySelector('.intro #name');
const formPhone = document.querySelector('.intro #phone-number');
const formEmail = document.querySelector('.intro #email');
const formDateOfBirth = document.querySelector('.intro #birth-date');
const formTransactionImage = document.querySelector('.intro #venmo-image');
const formBusWaiver = document.querySelector('.intro #bus-waiver');
const formSubmitButton = document.querySelector('.intro #submit-button');

formSubmitButton.onclick = function formSubmitButtonOnclick() {
  reserveTicket(
    formName,
    formEmail,
    formPhone,
    formDateOfBirth,
    formTransactionImage,
    formBusWaiver,
  );
};
