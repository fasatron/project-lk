const { User } = require('../models');

module.exports = {
    findUser(req, res, next) {
        if (req.session) {
            User.findById(req.session.userId)
                .then(user => {
                    req.User = user;
                    res.locals.User = user;

                    next();
                })
                .catch();
        } else {
            next();
        }
    },

    authenticated(req, res, next) {
        if (req.User) return next();
        
        res.status(403).redirect('/auth/login');
    },

    unauthenticated(req, res, next) {
        if (!req.User) return next();
        
        res.redirect('/users');
    }
};