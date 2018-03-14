const { User, Skill } = require('../models');

module.exports = {
  // GET /mentors
  showMentors(req, res, next) {
    User.find({ role: 'mentor' })
      .populate('skills')
      .then(data => {
        const mentors = data || [];

        res.render('mentors', { mentors, title: 'Mentors' });
      })
      .catch(next);
  },

  // GET /mentors?skill=:skill
  showMentorsBySkill(req, res) {
    Skill.findById(req.query.skill)
      .populate({
        path: 'users',
        match: { role: 'mentor' },
        populate: {
          path: 'skills',
        },
      })
      .then(data => {
        const mentors = (data || []).users || [];

        res.render('mentors', { mentors, title: 'Mentors' });
      });
  },
};
