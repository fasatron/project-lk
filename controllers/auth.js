const { Skill } = require('../models');

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

  // POST /auth/register
  register(req, res) {
    // TODO: Register user
  },

  // GET /auth/login
  showLoginPage(req, res) {
    res.render('auth/login', {
      id: 'login',
      title: 'Log in',
    });
  },

  // POST /auth/login
  login(req, res) {
    // TODO: Log user in
  },

  logout(req, res) {
    // TODO: Log user out
  },
};
