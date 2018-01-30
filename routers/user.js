const { Router } = require('express');

const router = Router();
const {
  user: { showUsers, showUsersBySkill },
  skill: { findSkills },
} = require('../controllers');

router.get('/', findSkills, (req, res, next) => {
  if (req.query.skill) {
    showUsersBySkill(req, res, next);
  } else {
    showUsers(req, res, next);
  }
});

module.exports = router;
