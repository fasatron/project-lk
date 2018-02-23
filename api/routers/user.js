const router = require('express').Router();

const { user: userController } = require('../controllers');

router.param('id', userController.user.find);

router.route('/')
    .get(userController.users.get)
    .post(userController.users.post);

router.route('/:id')
    .get(userController.user.get)
    .put(userController.user.put)
    .delete(userController.user.delete);

module.exports = router;