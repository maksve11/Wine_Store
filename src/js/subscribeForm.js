document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contact-form');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email-form');
    var phoneInput = document.getElementById('phone');
    var notesInput = document.getElementById('notes');
    var errorMessage = document.querySelector('.error-message');
    var loader = document.querySelector('.loader-form');
    var submitButton = contactForm.querySelector('button');

    var isSubmitting = false; 
    
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }
    
        var name = nameInput.value;
        var email = emailInput.value;
        var phone = phoneInput.value;
        var notes = notesInput.value;
    
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = 'Введите корректный email.';
            return;
        }
    
        errorMessage.textContent = '';
    
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

        isSubmitting = true;
        loader.style.display = 'block';
        submitButton.disabled = true;
    
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
            })
            .finally(function () {
                isSubmitting = false; 
                loader.style.display = 'none';
                submitButton.disabled = false;
            });
    });
});