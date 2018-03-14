const { User, Skill } = require('../../models');

module.exports = {
  findUser(req, res, next, id) {
    User.findById(id)
      .populate('skills')
      .then(data => {
        req.user = data || {};
        res.locals.mentor = req.user;

        next();
      })
      .catch(next);
  },

  // GET /admin/users
  showUsers(req, res, next) {
    User.find()
      .populate('skills')
      .then(data => {
        const users = data || [];

        res.render('users', { users, title: 'Users' });
      })
      .catch(next);
  },

  // GET /admin/users?skill=:skill
  showUsersBySkill(req, res) {
    Skill.findById(req.query.skill)
      .populate({
        path: 'users',
        populate: {
          path: 'skills',
        },
      })
      .then(data => {
        const users = (data || []).users || [];

        res.render('users', { users, title: 'Users' });
      });
  },

  // GET /admin/users/:user/update
  showUpdatePage(req, res) {
    Skill.find().then(data => {
      const skills = data || [];

      res.render('users/form', {
        skills,
        title: 'Edit User',
      });
    });
  },

  // GET /admin/users/:user/delete
  showDeletePage(req, res) {
    res.render('users/delete');
  },

  // POST /admin/users/:user/update
  updateUser(req, res, next) {
    User.findOneAndUpdate({ _id: req.user.id }, req.body)
      .then(user => res.redirect('/admin/users'))
      .catch(next);
  },

  // POST /admin/users/:user/delete
  deleteUser(req, res, next) {
    req.user
      .remove()
      .then(() => res.redirect('/admin/users'))
      .catch(next);
  },
};
