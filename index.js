const express = require('express');
const path = require('path');
const logger = require('morgan');

const routers = require('./routers')
const { error } = require('./middleware');
const config = require('./config');

const { paths, port } = config
const server = express();

server.set('view engine', 'pug');
server.set('views', paths.views);

server.use(express.static(paths.public));
server.use(logger('dev'));

server.use('/', routers.main);
server.use('/admin', routers.admin);
server.use('/users', routers.user);
server.use('/auth', routers.auth);

server.use(error.notFound);
server.use(server.get('env') === 'development' ? error.development : error.production);


server.listen(port, () => console.info('Server running on port', port));