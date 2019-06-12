const displayWarning = function displayWarningMessage(msg) {
  const containerForm = document.querySelector('.container form');

  const warningDiv = document.createElement('div');
  const warningCloseDiv = document.createElement('div');
  const warningPara = document.createElement('p');
  const warningCloseIcon = document.createElement('i');

  warningDiv.classList.add('warning');
  warningCloseDiv.classList.add('close');
  warningCloseIcon.classList.add('far');
  warningCloseIcon.classList.add('fa-times-circle');

  warningPara.textContent = msg;

  warningCloseDiv.appendChild(warningCloseIcon);
  warningDiv.appendChild(warningCloseDiv);
  warningDiv.appendChild(warningPara);
  containerForm.appendChild(warningDiv);

  setTimeout(() => {
    warningDiv.style.opacity = '1';
  }, 300);

  warningCloseDiv.onclick = function warningCloseOnclick() {
    warningDiv.style.opacity = '0';
    setTimeout(() => {
      warningDiv.remove();
    }, 300);
  };
};

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

export default function reserveTicket(
  name, email, phone, dateOfBirth, transactionImage, busWavier,
) {
  const isMissing = validateData(name, email, phone, dateOfBirth, transactionImage, busWavier);
  if (!isMissing) {
    sendReservation(name, email, phone, dateOfBirth, transactionImage, busWavier);
  }
}
