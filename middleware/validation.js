
const { validationResult } = require('express-validator/check');

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${param}: ${msg}`;
};

module.exports = {
  validate(req, res, next) {
      const result = validationResult(req).formatWith(errorFormatter);

      if (!result.isEmpty()) {
        const error = new Error(`${result.array()}`);

        return next(error);
      }

      next();
    }
}