const { Skill, User } = require('../models');

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
  register(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    User.create(req.body)
      .then(user => {
        req.session.userId = user.id;
        res.redirect('/profile');
      })
      .catch(next);
  },

  // GET /auth/login
  showLoginPage(req, res) {
    res.render('auth/login', {
      id: 'login',
      title: 'Log in',
    });
  },

  // POST /auth/login
  login(req, res, next) {
    const { email, password } = req.body;

    User.authenticate(email, password)
      .then(user => {
        req.session.userId = user.id;
        res.redirect('/profile');
      })
      .catch(next);
  },

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
