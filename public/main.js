if (typeof fetch !== 'function') {
  document.getElementById('errorMessage').style.display = 'block';
}

var phoneNumberInput = document.getElementById('phoneNumber');
var countryFlag = document.querySelector('.country-code');
var lastTimeout = undefined;

phoneNumberInput.addEventListener('keyup', keyListener);

function keyListener() {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  
  if (phoneNumberInput.value.length > 4) {
    lastTimeout = setTimeout(verifyNumber, 300);
  }
}

function verifyNumber() {
  showLoading();
  var currentNumber = phoneNumberInput.value;
  fetch('/check/' + currentNumber)
    .then(function (response) {
      stopLoading();
      if (!response.ok) {
        throw new Error('Something went wrong with the HTTP call.');
      }
      return response.json();
    })
    .then(function (data) {  
      if (data.valid) {
        countryFlag.innerHTML = emojione.toImage(':flag_' + data.country.toLowerCase() + ':');
        phoneNumberInput.setCustomValidity('');
      } else {
        phoneNumberInput.setCustomValidity('Invalid phone number');
      }
    })
    .catch(function (err) {
      phoneNumberInput.setCustomValidity('Could not verify number');
      console.error(err.message);
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