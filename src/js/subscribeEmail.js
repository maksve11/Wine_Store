document.addEventListener('DOMContentLoaded', function () {
    var subscribeForm = document.getElementById('subscribe-email');
    var emailInput = document.getElementById('email');
    var errorMessage = document.querySelector('.error-message');

    subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = emailInput.value;

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = 'Введите корректный email.';
            return;
        }

        errorMessage.textContent = '';

        var data = {
            email: email
        };

        var options = {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: {
                'Content-Type': 'application/json', 
            },
        };

        fetch('https://my-json-server.typicode.com/maksve11/Wine_Store/posts', options)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Ошибка при отправке данных');
                }
            })
            .then(function (data) {
                console.log(data);
                errorMessage.textContent = 'Данные успешно отправлены.';
                setTimeout(function () {
                    window.location.reload();
                }, 2000); 
            })
            .catch(function (error) {
                console.error(error);
                errorMessage.textContent = 'Произошла ошибка при отправке данных.';
            });
    });
});