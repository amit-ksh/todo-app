require('../css/style.css');
require('../css/auth.css');

import { checkEmail, checkPassword, debounce } from './validate';

const params = new URLSearchParams(window.location.search);

if (params.get('userExist')) {
  setTimeout(() => {
    document.querySelector('.user-exist').classList.add('activePopup');
    setTimeout(() => {
      document.querySelector('.user-exist').classList.remove('activePopup');
    }, 5000);
  }, 500);
}

if (params.get('accCreated')) {
  setTimeout(() => {
    document.querySelector('.new-user').classList.add('activePopup');
    setTimeout(() => {
      document.querySelector('.new-user').classList.remove('activePopup');
    }, 5000);
  }, 500);
}

const loginFormEl = document.querySelector('#login-form');
const emailEl = loginFormEl.querySelector('#email');
const passwordEl = loginFormEl.querySelector('#password');

loginFormEl.addEventListener('submit', function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isEmailValid = checkEmail(emailEl),
    isPasswordValid = checkPassword(passwordEl);

  let isFormValid = isEmailValid && isPasswordValid;

  if (isFormValid) {
    [emailEl.value, passwordEl.value] = ['', ''];

    console.log('Login Form Submitted');
  }
});

loginFormEl.addEventListener(
  'focusout',
  debounce(function (e) {
    switch (e.target.id) {
      case 'email':
        checkEmail(emailEl);
        break;
      case 'password':
        checkPassword(passwordEl);
        break;
    }
  })
);