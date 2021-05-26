const bcrypt = require('bcrypt');

function _getHashedPassword(password) {
  return bcrypt.hashSync(password, 10);
}

module.exports = {
  getHashedPassword: (password) => {
    return _getHashedPassword(password);
  },
  compareHash: (password, hash) => {
    return bcrypt.compareSync(password, hash);
    }
};
/*
module.exports = {
  save_name: function(req, res) {
    req.session.user = req.body.user;
    Login.findOne({ name: req.body.user },
                  function(err, user) {
      if (err)
        return res.json({ error: true });
      bcrypt.compare(req.body.password,
                     user.password,
                     function(err, valid) {
        res.json({ error: !!(err || !valid) });
      });
    });
  }, // end of save name method
  register: function(req, res) {
    bcrypt.hash(req.body.password, 8, function(err, hash) {
      if (err)
        return res.json({ error: true });
      login = new Login({
        name: req.body.user,
        password: hash
      })
      login.save(function(err) {
        res.json({ error: !!err });
      })
    });
  } // end of register user function
};
*/
