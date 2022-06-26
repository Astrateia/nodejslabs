import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
const port = 3000;

const ACCOUNTS_MOCK = {
    admin: {
        id: 1,
        login: 'admin',
        password: '1234'
    }
}

const sessions = new Map; // map sign in cookie -> session

// Parse cookies
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Serve static files
app.use(express.static('static'));

// Account CRUD 
app.post('/account/get', (req, res) => {
    console.log('Account found');
    // res.send(JSON.stringify(account));
    res.end(200);
});

app.post('/account/delete', (req, res) => {
    // Deleting account
    console.log('Account deleted');
    res.end(200);
});

app.post('/account/update', (req, res) => {
    // Updating account
    console.log('Account updated');
    res.end(200);
});

app.post('/account/create', (req, res) => {
    // Creating account
    console.log('Account created');
    res.end(200);
});

app.post('/account/login', (req, res) => {
    const account = Object.keys(ACCOUNTS_MOCK).find(login => login === req.body.login);
    if (account) {
        if (req.body.password == account.password) {

            let cookie = Math.random().toString();
            cookie = cookie.substring(2, cookie.length);
            res.cookie('sign', cookie, { maxAge: 900000, httpOnly: true });

            sessions.set(account.id, cookie);

            console.log('Log in success');
            res.redirect(307, '/home.html');
        }
    }

    console.log('Log in failed');
    res.end(403);
});

// Animal CRUD 
app.post('/animal/get', (req, res) => {
    console.log('Animal found');
    // res.send(JSON.stringify(account));
    res.end(200);
});

app.post('/animal/delete', (req, res) => {
    // Deleting animal
    console.log('Animal deleted');
    res.end(200);
});

app.post('/animal/update', (req, res) => {
    // Updating animal
    console.log('Animal updated');
    res.end(200);
});

app.post('/animal/create', (req, res) => {
    // Creating animal
    console.log('Animal created');
    res.end(200);
});

app.use('/home.html', (req, res) => {
    if (sessions.get(req.cookies.sign)) {
        next();
    } else {
        res.redirect(403, '/');
    }
});

app.listen(port, () => {
    console.log(`Http server listening on http://localhost:${port}`)
})

