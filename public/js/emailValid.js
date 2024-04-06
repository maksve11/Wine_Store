document.addEventListener('DOMContentLoaded', function () {
  var emailInput = document.getElementById('email');
  var errorMessage = document.querySelector('.error-message');

  emailInput.addEventListener('input', function () {
    var email = emailInput.value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.match(emailPattern)) {
      emailInput.classList.remove('invalid');
      errorMessage.style.display = 'none';
    } else {
      emailInput.classList.add('invalid');
      errorMessage.style.display = 'block';
    }
  });
});