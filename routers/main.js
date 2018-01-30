const { Router } = require('express');

const router = Router();

const { main: { showMain } } = require('../controllers');

router.get('/', showMain);

module.exports = router;
