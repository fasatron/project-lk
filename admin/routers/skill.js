const router = require('express').Router();

const { skill: controller } = require('../controllers');

router.param('skill', controller.findSkill);

router.get('/', controller.showIndexPage);

router
  .route('/create')
  .get(controller.showCreatePage)
  .post(controller.createSkill);

router
  .route('/:skill/update')
  .get(controller.showUpdatePage)
  .post(controller.updateSkill);

router
  .route('/:skill/delete')
  .get(controller.showDeletePage)
  .post(controller.deleteSkill);

module.exports = router;
