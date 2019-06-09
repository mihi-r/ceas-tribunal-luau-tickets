const birthdayInput = document.querySelector(".selection-intro #birth-date");

birthdayInput.onkeyup = function (event) {
    if ((birthdayInput.value.length == 2 || birthdayInput.value.length == 5) && 
    birthdayInput.value != "" && 
    event.key !== 'Backspace') {
        birthdayInput.value+="/";
    }
}
