import displayWarning from './warning-view.js';

/**
 * Checks if a field is missing and highlights the field is so.
 * @param {Element} field - The field to check.
 * @returns {boolean} If the field is missing.
 */
const checkField = function checkForMissingField(field) {
  let isFieldMissing = false;

  if (field.value === '') {
    field.classList.add('missing');
    isFieldMissing = true;
  } else if (field.classList.contains('missing')) {
    field.classList.remove('missing');
  }

  return isFieldMissing;
};

/**
 * Checks if a file field is missing a file and highlights the field is so.
 * @param {Element} fileField - The field to check.
 * @returns {boolean} If the file field is missing.
 */
const checkFile = function checkFileMissing(fileField) {
  let isFileMissing = false;

  if (fileField.files.length === 0) {
    fileField.classList.add('missing');
    isFileMissing = true;
  } else if (fileField.classList.contains('missing')) {
    fileField.classList.remove('missing');
  }

  return isFileMissing;
};

/**
 * Validates data by checking for missing fields.
 * @param {Element} name - The name field to validate.
 * @param {Element} email - The email field to validate.
 * @param {Element} phone - The phone field to validate.
 * @param {Element} dateOfBirth - The date of birth field to validate.
 * @param {Element} transactionImage - The transaction image field to validate.
 * @param {Element} busWavier - The bus wavier field to validate.
 * @returns {boolean} If any of the fields are missing.
 */
const validateData = function validateDataForMissingValues(
  name, email, phone, dateOfBirth, transactionImage, busWavier,
) {
  let isFieldMissing = false;
  const missingItems = [];

  missingItems.push(checkField(name));
  missingItems.push(checkField(email));
  missingItems.push(checkField(phone));
  missingItems.push(checkField(dateOfBirth));
  missingItems.push(checkFile(transactionImage));
  missingItems.push(checkFile(busWavier));

  if (missingItems.includes(true)) {
    isFieldMissing = true;
    displayWarning('Please fill in all of the fields.');
  }

  return isFieldMissing;
};

/**
 * Sends the form information to the backend through a POST call.
 * @param {Element} name - The name field to send.
 * @param {Element} email - The email field to send.
 * @param {Element} phone - The phone field to send.
 * @param {Element} dateOfBirth - The date of birth field to send.
 * @param {Element} transactionImage - The transaction image field to send.
 * @param {Element} busWavier - The bus wavier field to send.
 */
const sendReservation = function sendReservationData(
  name, email, phone, dateOfBirth, transactionImage, busWavier,
) {
  const formSubmitButton = document.querySelector('.intro #submit-button');
  const formLoader = document.querySelector('.intro .loader');
  formSubmitButton.style.display = 'none';
  formLoader.style.display = 'block';

  const submissionData = {
    nameText: name.value,
    emailText: email.value,
    phoneText: phone.value,
    dateOfBirthText: dateOfBirth.value,
    transactionImageFile: transactionImage.files[0],
    busWavierFile: busWavier.files[0],
  };

  const submissionFormData = new FormData();

  Object.keys(submissionData).forEach((data) => {
    submissionFormData.append(data, submissionData[data]);
  });

  fetch('api/send_reservation.php', {
    method: 'POST',
    body: submissionFormData,
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'success') {
        document.querySelector('.intro form').style.display = 'none';
        document.querySelector('.reserved-ticket').style.display = 'block';
        document.querySelector('.reserved-ticket .reserved-email').textContent = email.value;
      } else {
        displayWarning(data.message);
        formLoader.style.display = 'none';
        formSubmitButton.style.display = 'block';
      }
    })
    .catch(() => {
      displayWarning('Something went wrong while sending your information. Please check your network connection and try again.');
      formLoader.style.display = 'none';
      formSubmitButton.style.display = 'block';
    });
};

/**
 * Validates and sends form data.
 * @param {Element} name - The name field to validate and send.
 * @param {Element} email - The email field to validate and send.
 * @param {Element} phone - The phone field to validate and send.
 * @param {Element} dateOfBirth - The date of birth field to validate and send.
 * @param {Element} transactionImage - The transaction image field to validate and send.
 * @param {Element} busWavier - The bus wavier field to validate and send.
 */
export default function reserveTicket(
  name, email, phone, dateOfBirth, transactionImage, busWavier,
) {
  const isMissing = validateData(name, email, phone, dateOfBirth, transactionImage, busWavier);
  if (!isMissing) {
    sendReservation(name, email, phone, dateOfBirth, transactionImage, busWavier);
  }
}
