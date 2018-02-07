const passport = require('passport');
const { Strategy: GitHubStrategy } = require('passport-github');
const { User } = require('../../models');

const config = require('../../config');

passport.use(
  new GitHubStrategy(
    config.oauth.github,
    (accessToken, refreshToken, profile, done) => {
      if (!profile.emails)
        return done(
          new Error('To enter need to get an email from GitHub'),
        );

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
