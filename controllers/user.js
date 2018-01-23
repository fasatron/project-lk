const users = require('../data/users');

module.exports = {
    showUsers(req, res) {
      res.render('users', { users })
    }
}