const { Skill } = require('../models');

module.exports = {
  findSkills(req, res, next) {
    Skill.find().then(data => {
      const skills = data || [];

      res.locals.skills = skills;

      next();
    });
  },
};
