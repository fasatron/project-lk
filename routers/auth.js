const router = require('express').Router();

const {
  validation: {
    email,
    password,
    confirmPassword,
    validationResult,
    errorFormatter,
  },
} = require('../services');

const {
  auth: { showRegisterPage, showLoginPage, login, register, logout },
  oauth: { github, facebook, vk },
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


// Github
router.get('/github', github.authenticate);
router.get('/github/callback', github.callback);

// Facebook
router.get('/facebook', facebook.authenticate);
router.get('/facebook/callback', facebook.callback);

// Facebook
router.get('/vk', vk.authenticate);
router.get('/vk/callback', vk.callback);

router.get('/logout', authenticated, logout);

module.exports = router;
