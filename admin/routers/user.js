const router = require('express').Router();

const {
  user: {
    findUser,
    showUpdatePage,
    updateUser,
    showDeletePage,
    deleteUser,
    showUsersBySkill,
    showUsers,
  },
  skill: { findSkills },
} = require('../controllers');

router.param('user', findUser);

router.get('/', findSkills, (req, res, next) => {
  if (req.query.skill) {
    showUsersBySkill(req, res, next);
  } else {
    showUsers(req, res, next);
  }
});

router
  .route('/:user/update')
  .get(showUpdatePage)
  .post(updateUser);

router
  .route('/:user/delete')
  .get(showDeletePage)
  .post(deleteUser);

module.exports = router;
