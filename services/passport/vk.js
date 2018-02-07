const passport = require('passport');
const { Strategy: VkStrategy } = require('passport-vkontakte');
const { User } = require('../../models');

const config = require('../../config');

passport.use(
  new VkStrategy(
    config.oauth.vk,
    (accessToken, refreshToken, params, profile, done) => {
      const { email } = params;

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
