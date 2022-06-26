import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3000;

const ACCOUNTS_MOCK = [
  {
    id: 1,
    login: 'admin',
    password: '1234'
  }
];

const sessions = new Map(); // map sign in cookie -> session

// Parse cookies
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/home.html', (req, res, next) => {
  if (sessions.get(req.cookies.sign)) {
    next();
  } else {
    res.redirect(300, '/');
  }
});

// Serve static files
app.use(express.static('static'));

// Account CRUD
app.post('/account/get', (req, res) => {
  console.log('Account found');
  // res.send(JSON.stringify(account));
  res.status(200);
  res.end();
});

app.post('/account/delete', (req, res) => {
  // Deleting account
  console.log('Account deleted');
  res.status(200);
  res.end();
});

app.post('/account/update', (req, res) => {
  // Updating account
  console.log('Account updated');
  res.status(200);
  res.end();
});

app.post('/account/create', (req, res) => {
  // Creating account
  console.log('Account created');
  res.status(200);
  res.end();
});

app.post('/account/login', (req, res) => {
  const account = ACCOUNTS_MOCK.find(({ login }) => login === req.body.login);
  if (account && req.body.password === account.password) {
    let cookie = Math.random().toString();
    cookie = cookie.substring(2, cookie.length);
    res.cookie('sign', cookie, { maxAge: 900000, httpOnly: false });

    sessions.set(cookie, account);

    console.log('Log in success');
    res.redirect(302, '/home.html');
    res.end();
  } else {
    console.log('Log in failed');
    res.status(403);
    res.end();
  }
});

// Animal CRUD
app.post('/animal/get', (req, res) => {
  console.log('Animal found');
  // res.send(JSON.stringify(account));
  res.status(200);
  res.end();
});

app.post('/animal/delete', (req, res) => {
  // Deleting animal
  console.log('Animal deleted');
  res.status(200);
  res.end();
});

app.post('/animal/update', (req, res) => {
  // Updating animal
  console.log('Animal updated');
  res.status(200);
  res.end();
});

app.post('/animal/create', (req, res) => {
  // Creating animal
  console.log('Animal created');
  res.status(200);
  res.end();
});


app.listen(port, () => {
  console.log(`Http server listening on http://localhost:${port}`);
});

