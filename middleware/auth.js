const { User } = require('../models');

module.exports = {
  findUser(req, res, next) {
    res.locals.user = req.user;

    next();
  },

  authenticated(req, res, next) {
    if (req.user) return next();

    res.status(403).redirect('/auth/login');
  },

  unauthenticated(req, res, next) {
    if (!req.user) return next();

    res.redirect('/users');
  },
};
