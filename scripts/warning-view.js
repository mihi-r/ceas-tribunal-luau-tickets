/**
 * Generate a dismissible warning message.
 * @param {string} msg - The message to display.
 */
export default function displayWarning(msg) {
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
}
