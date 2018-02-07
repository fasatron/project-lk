const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { User } = require('../../models');

const config = require('../../config');

passport.use(
  new FacebookStrategy(
    config.oauth.facebook,
    (accessToken, refreshToken, profile, done) => {
      if (!profile.emails)
        return done(new Error('To enter need to get an email from Facebook'));

      const email = profile.emails[0].value;

      User.findOneAndUpdate(
        { email },
        {
          email,
        },
        { upsert: true, new: true },
        done,
      );
    },
  ),
);
