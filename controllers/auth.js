const { Skill } = require('../models');
const { passport } = require('../services');

module.exports = {
  // GET /auth/register
  showRegisterPage(req, res) {
    Skill.find().then(data => {
      const skills = data || [];

      res.render('auth/register', {
        id: 'register',
        title: 'Registration',
        skills,
      });
    });
  },

  // GET /auth/login
  showLoginPage(req, res) {
    res.render('auth/login', {
      id: 'login',
      title: 'Log in',
    });
  },

  // POST /auth/register
  register: passport.authenticate('local-register', {
    failureRedirect: '/auth/register',
    successRedirect: '/profile',
  }),

  // POST /auth/login
  login: passport.authenticate('local-login', {
    failureRedirect: '/auth/login',
    successRedirect: '/profile',
  }),

  // GET /auth/logout
  logout(req, res, next) {
    if (req.session) {
      req.session.destroy(error => {
        if (error) return next(error);

        res.redirect('/');
      });
    } else {
      next();
    }
  },
};
