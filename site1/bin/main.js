const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // middleware
const cookieParser = require('cookie-parser'); // middleware

const tokenSec = require.main.require('./security/tokenSec');

const app = express();
const authTokens = {};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// To parse cookies from the HTTP Request
app.use(cookieParser());
app.use((req, res, next) => {
    // Get auth token from the cookies
    const authToken = req.cookies['AuthToken'];

    // Inject the user to the request
    req.user = authTokens[authToken];

    next();
});
app.use('/', require('./routes/index'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App listening on port ${port}`));
