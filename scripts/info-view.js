/**
 * Displays various information about the event details in the form.
 * @param {string} description - The description of the event to display.
 * @param {int} price - The price of the ticket to display.
 * @param {string} venmoRecipient - The reciepient of the venmo transaction to display.
 */
const displayInfo = function displayInfoForView(description, price, venmoRecipient) {
  const descriptionDiv = document.querySelector('.selection-intro .intro-info');
  descriptionDiv.textContent = description;

  // TODO: Add price and venmo recipient information
};

/**
 * Gets info about the event to display in the form.
 * @exports
 */
export default function getInfo() {
  fetch('api/get_info.php', {
    method: 'GET',
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 'success') {
        const mostRecentData = data.data[data.data.length - 1];
        displayInfo(
          mostRecentData.description,
          mostRecentData.price,
          mostRecentData.venmo_recipient,
        );
      } else {
        // TODO: Remove this console.error and add a warning to the user
        console.error('error');
      }
    })
    .catch((error) => {
      // TODO: Remove this console.error and add a warning to the user
      console.error(error);
    });
}
