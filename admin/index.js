const express = require('express');
const path = require('path');

const admin = express();

const routers = require('./routers');
const { auth: { allowAdmin } } = require('./middlewares');

admin.set('views', path.join(__dirname, 'views'));
admin.set('view engine', 'pug');

admin.on('mount', server => {
  admin.locals = Object.assign(server.locals, admin.locals);
});

admin.use(allowAdmin);
admin.use('/', routers.home);
admin.use('/users', routers.user);
admin.use('/skills', routers.skill);

module.exports = admin;
