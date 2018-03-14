const { passport } = require('../services');

module.exports = {
  github: {
    authenticate: passport.authenticate('github'),
    callback: passport.authenticate('github', {
      failureRedirect: '/auth/login',
      successRedirect: '/mentors',
    }),
  },

  facebook: {
    authenticate: passport.authenticate('facebook', { scope: ['email'] }),
    callback: passport.authenticate('facebook', {
      failureRedirect: '/auth/login',
      successRedirect: '/mentors',
    }),
  },

  vk: {
    authenticate: passport.authenticate('vkontakte', {
      scope: ['email'],
    }),
    callback: passport.authenticate('vkontakte', {
      failureRedirect: '/auth/login',
      successRedirect: '/mentors',
    }),
  },
};
