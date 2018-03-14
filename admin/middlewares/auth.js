module.exports = {
  allowAdmin(req, res, next) {
    if (!req.user.isAdmin) return res.redirect('/');

    next();
  },
};
