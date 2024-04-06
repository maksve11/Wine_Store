const showLogin = () => {
  document.querySelector('#login-form').style.display = 'block';
  document.querySelector('#show-register').style.display = 'block';
};

const showRegister = () => {
  document.querySelector('#login-form').style.display = 'none';
  document.querySelector('#show-register').style.display = 'none';
};

document.querySelector('#show-login').addEventListener('click', showLogin);
document.querySelector('#show-register').addEventListener('click', showRegister);

document.querySelector('#login-form').addEventListener('submit', (event) => {
  event.preventDefault();
});
