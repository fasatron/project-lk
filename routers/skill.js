const { Router } = require('express');

const router = Router();
const { skill: { showUsersBySkill } } = require('../controllers');

module.exports = router;
