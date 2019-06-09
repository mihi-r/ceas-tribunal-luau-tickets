var birthdayInput = document.querySelector(".selection-intro #birthDate");

birthdayInput.onkeydown = function (event) {
    if ((birthdayInput.value.length == 2 || birthdayInput.value.length == 5) && birthdayInput.value != "") {
        birthdayInput.value+="/";
    }
}
