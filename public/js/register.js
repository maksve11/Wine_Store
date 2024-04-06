const form = document.getElementById('register-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }

  const response = await fetch('/auth/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    alert('Регистрация прошла успешно');
  } else {
    alert('Произошла ошибка при регистрации');
  }
});
