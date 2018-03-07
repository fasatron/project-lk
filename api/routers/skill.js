const { Skill } = require('../../models');

const router = require('express').Router();

const skillController = require('../controllers').skill(Skill);

router.param('id', skillController.skill.find);

router
  .route('/')
  .get(skillController.skills.get)
  .post(skillController.skills.post);

router
  .route('/:id')
  .get(skillController.skill.get)
  .put(skillController.skill.put)
  .delete(skillController.skill.delete);

module.exports = router;
