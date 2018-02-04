const router = require('express').Router();

const {
  validation: {
    email,
    password,
    confirmPassword,
    validationResult,
    errorFormatter,
  },
} = require('../services/validation');

const {
  auth: { showRegisterPage, showLoginPage, login, register, logout },
} = require('../controllers');
const {
  auth: { authenticated, unauthenticated },
  validation: { validate },
} = require('../middleware');

router
  .route('/register')
  .all(unauthenticated)
  .get(showRegisterPage)
  .post([email, password, confirmPassword], validate, register);

router
  .route('/login')
  .all(unauthenticated)
  .get(showLoginPage)
  .post([email, password], validate, login);

router.get('/logout', authenticated, logout);

module.exports = router;
