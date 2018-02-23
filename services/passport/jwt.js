const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../../models');

const { jwtSecret } = require('../../config');
const options = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(options, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (!user) return done(null, false);

        done(null, user);
      })
      .catch(done);
  })
);
