const { User } = require('../models');

// GET /profile
module.exports = {
  showUpdatePage(req, res) {
    const user = req.user || {};

    res.render('profile', {
      user,
      title: 'Profile',
    });
  },

  // GET /profile/delete
  showDeletePage(req, res) {
    const user = req.user || {};

    res.render('profile/delete', { user });
  },

  // POST /profile
  updateProfile(req, res, next) {
    User.findOneAndUpdate({ _id: req.user.id }, req.body)
      .then(user => res.redirect('/'))
      .catch(next);
  },

  // POST /profile/delete
  deleteProfile(req, res, next) {
    req.user
      .remove()
      .then(() => {
        if (req.session) {
          req.session.destroy(error => {
            if (error) return next(error);

            res.redirect('/');
          });
        } else {
          next();
        }
      })
      .catch(next);
  },
};
