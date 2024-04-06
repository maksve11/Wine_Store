const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index', { isAuthorized: false, user: { name: 'maksvell' } });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  res.json({ message: 'Успешный вход' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  res.json({ message: 'Успешная регистрация' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
