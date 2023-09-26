document.querySelector('.info-form form').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var notes = document.getElementById('notes').value;
    var errorMessage = document.getElementById('error-message');

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Введите корректный email.';
        return;
    }

    var data = {
        name: name,
        email: email,
        phone: phone,
        notes: notes
    };

    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch('https://my-json-server.typicode.com/maksve11/Wine_Store', options)
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
        })
        .catch(function (error) {
            console.error(error);
            errorMessage.textContent = 'Произошла ошибка при отправке данных.';
        });
});