
var path = require("path");
const hash = require.main.require('./security/hashSec');

const users = [
  {'id': 'user', 'password': hash.getHashedPassword("pass") }
  , {'id': 'admin', 'password': hash.getHashedPassword("pass") }
  , {'id': 'super', 'password': hash.getHashedPassword("pass") }
]

exports.users = users;
