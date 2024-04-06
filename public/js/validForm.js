document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var phoneInput = document.getElementById('phone');
    var emailInput = document.getElementById('email-form');
    var errorMessage = document.querySelector('.error-message');
    var successMessage = document.querySelector('.success-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var phonePattern = /^[0-9]{10}$/;
        var phoneNumber = phoneInput.value;
        if (!phonePattern.test(phoneNumber)) {
            errorMessage.textContent = 'Пожалуйста, введите 10 цифр без разделителей.';
            return;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var emailAddress = emailInput.value;
        if (!emailPattern.test(emailAddress)) {
            errorMessage.textContent = 'Пожалуйста, введите корректный адрес электронной почты.';
            return;
        }

        if (errorMessage) {
            errorMessage.textContent = '';
        }
        if (successMessage) {
            successMessage.textContent = 'Данные отправлены успешно!';
        }
    });
});
