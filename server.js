const path = require('path');
const express = require('express');
const robots = require('express-robots');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const helmet = require('helmet');

const { db, passport } = require('./services');
const admin = require('./admin');
const api = require('./api');
const routers = require('./routers');
const { error, auth, csrf } = require('./middleware');
const config = require('./config');

const { paths, port } = config;
const server = express();

server.set('view engine', 'pug');
server.set('views', paths.views);
server.set('port', config.port);

server.locals.basedir = paths.views;

server.use(
  helmet({
    frameguard: { action: 'deny' },
    hsts: false,
  })
);

server.use(express.static(paths.public));
server.use(favicon(path.join(paths.public, 'favicon.ico')));
server.use(robots({ UserAgent: '*', Disallow: '/' }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(
  session({
    name: 'sessionId',
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure: true,
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    },
    store: new MongoStore({
      uri: config.mongodbUri,
      databaseName: 'codementor',
      collection: 'mySessions'
    }),
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(logger('dev'));
server.use(auth.findUser);

server.use('/api', api);

server.use(csurf(), csrf);
server.use('/', routers.main);
server.use('/auth', routers.auth);
server.use('/users', routers.user);
server.use(auth.authenticated);
server.use('/profile', routers.profile);
server.use('/admin', admin);

server.use(error.notFound);
server.use(
  server.get('env') === 'development' ? error.development : error.production
);

module.exports = server;
