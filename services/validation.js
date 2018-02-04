const { body } = require('express-validator/check');

const validation = {
  email: body('email')
    .isEmail()
    .withMessage('incorrect email')
    .trim()
    .normalizeEmail(),

  first_name: body('first_name').exists(),
  last_name: body('last_name').exists(),
  
  password: body(
    'password',
    'passwords must be at least 7 chars long',
  ).isLength({ min: 7 }),

  confirmPassword: body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage(
      'confirm password field must have the same value as the password field',
    ),
};

module.exports = {
  validation,
};
