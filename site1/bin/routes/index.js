const express = require('express');
const router = express.Router();

var path = require("path");
const hashSec = require.main.require('./security/hashSec');
const tokenSec = require.main.require('./security/tokenSec');
const target = require.main.require('./users');
const authTokens = {};

router.get('/', (req, res) => {
    res.render('index', {
        message: 'Please login to continue',
        messageClass: 'alert-info'
    });
});

router.get('/greeting', (req, res) => {
    if (req.user) {
        res.render('greeting', {
            message: 'Login successful',
            messageClass: 'alert-info'
        });
    } else {
        res.render('index');
    }
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  //const hashedPassword = hashSec.getHashedPassword(password);
  var user = false;
  user = target.users.find(u => {
    if (u.id == username
    && hashSec.compareHash(password, u.password)) {
      return true;
    }
  });

  if (user) {
      const authToken = tokenSec.generateAuthToken();

      // Store authentication token
      authTokens[authToken] = user;

      // Setting the auth token in cookies
      res.cookie('AuthToken', authToken);

      // Redirect user to the protected page
      res.render('greeting', {user: true});
  } else {
      res.render('index', {
          message: 'Invalid username or password',
          messageClass: 'alert-danger'
      });
  }
});

module.exports = router;
