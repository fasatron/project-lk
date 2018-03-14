const { Router } = require('express');

const router = Router();
const {
  mentor: { showMentors, showMentorsBySkill },
  skill: { findSkills },
} = require('../controllers');

router.get('/', findSkills, (req, res, next) => {
  if (req.query.skill) {
    showMentorsBySkill(req, res, next);
  } else {
    showMentors(req, res, next);
  }
});

module.exports = router;
