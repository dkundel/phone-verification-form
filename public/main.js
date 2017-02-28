if (typeof fetch !== 'function') {
  alert('THIS DEMO WORKS ONLY IN  BROWSER THAT SUPPORTS FETCH. Adjust the fetch call to use a different AJAX HTTP request to use it in other browsers.')
}

var phoneNumberInput = document.getElementById('phoneNumber');
var countryFlag = document.querySelector('.country-code');
var lastTimeout = undefined;

phoneNumberInput.addEventListener('keyup', keyListener);

function keyListener() {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  
  lastTimeout = setTimeout(verifyNumber, 300);
}

function verifyNumber() {
  showLoading();
  var currentNumber = phoneNumberInput.value;
  fetch('/check/' + currentNumber)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {  
    stopLoading();
    if (data.valid) {
      countryFlag.innerHTML = emojione.toImage(':flag_' + data.country.toLowerCase() + ':');
      phoneNumberInput.setCustomValidity('');
    } else {
      phoneNumberInput.setCustomValidity('Invalid phone number');
    }
  })
  .catch(function (err) {
    console.log(err.message);
  });
}

function showLoading() {
  countryFlag.setAttribute('data-loading', true);
  countryFlag.innerHTML = emojione.toImage(':arrows_counterclockwise:');
}

function stopLoading() {
  countryFlag.removeAttribute('data-loading');
  countryFlag.innerHTML = '';
}

keyListener();