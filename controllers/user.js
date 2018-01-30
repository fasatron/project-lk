const { User, Skill } = require('../models');

module.exports = {
  // GET /users
  showUsers(req, res, next) {
    User.find()
      .populate('skills')
      .then(data => {
        const users = data || [];

        res.render('users', { users, title: 'Mentors' });
      })
      .catch(next);
  },

  // GET /users?skill=:skill
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

        res.render('users', { users, title: 'Mentors' });
      });
  },
};
