const path = require('path');
const express = require('express');
const robots = require('express-robots')
const favicon = require('serve-favicon')
const logger = require('morgan');

const connection = require('./services/db');
const admin = require('./admin');
const routers = require('./routers')
const { error } = require('./middleware');
const config = require('./config');

const { paths, port } = config
const server = express();

server.set('view engine', 'pug');
server.set('views', paths.views);

server.locals.basedir = paths.views;

server.use(express.static(paths.public));
server.use(favicon(path.join(paths.public, 'favicon.ico')));
server.use(robots({UserAgent: '*', Disallow: '/'}));
server.use(express.urlencoded({ extended: false }));

server.use(logger('dev'));

server.use('/', routers.main);
server.use('/users', routers.user);
server.use('/auth', routers.auth);
server.use('/admin', admin);

server.use(error.notFound);
server.use(server.get('env') === 'development' ? error.development : error.production);


server.listen(port, () => console.info('Server running on port', port));