const { Router } = require('express');

const router = Router();
const { user: { showUsers } } = require('../controllers')

router.get('/', showUsers);

module.exports = router;