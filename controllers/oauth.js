const { passport } = require('../services');

module.exports = {
  github: {
    authenticate: passport.authenticate('github'),
    callback: passport.authenticate('github', {
      failureRedirect: '/auth/login',
      successRedirect: '/profile',
    }),
  },

  facebook: {
    authenticate: passport.authenticate('facebook', { scope: ['email'] }),
    callback: passport.authenticate('facebook', {
      failureRedirect: '/auth/login',
      successRedirect: '/profile',
    }),
  },

  vk: {
    authenticate: passport.authenticate('vkontakte', { scope: ['email', 'friends'] }),
    callback: passport.authenticate('vkontakte', {
      failureRedirect: '/auth/login',
      successRedirect: '/profile',
    }),
  },
};
