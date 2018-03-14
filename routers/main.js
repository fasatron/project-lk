const { Router } = require('express');

const router = Router();

const { main: { showMain } } = require('../controllers');

router.get('/', (req, res, next) => {
  res.redirect('/users');
});

module.exports = router;
