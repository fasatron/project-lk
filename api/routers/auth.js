const router = require('express').Router();
const jwt = require('jwt-simple');

const { jwtSecret } = require('../../config');
const { User } = require('../../models');

router.post('/token', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(401);

  User.findOne({ email })
    .then(user => {
      if (!user) return res.sendStatus(401);
      if (!user.isCorrectPassword(req.body.password))
        return res.sendStatus(401);

      const payload = { id: user.id };
      const token = jwt.encode(payload, jwtSecret);

      res.json({ token });
    })
    .catch(next);
});

module.exports = router;
