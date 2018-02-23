const express = require('express');
const passport = require('passport');

const api = express();

const routers = require('./routers');

api.use(routers.auth);
api.use(passport.authenticate('jwt', { session: false }));
api.use('/users', routers.user);
api.use('/skills', routers.skill);

api.use((error, req, res, next) => {
    res.status(500).json(error);
});

module.exports = api;