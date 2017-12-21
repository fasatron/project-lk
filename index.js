const express = require('express');
const path = require('path');
const logger = require('morgan');

const mainRouter = require('./routers/main');
const adminRouter = require('./routers/admin');

const config = require('./config');

const port = config.port || 3000;
const host = config.host || '127.0.0.1'

const server = express();

server.use(express.static(path.join(__dirname, 'public')));

server.use(logger('dev'));

server.use('/', mainRouter);
server.use('/admin', adminRouter);

server.listen(port, host, () => console.info('Server running on port', port));