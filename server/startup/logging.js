const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: 'logfile.log' });
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://127.0.0.1:27017/oneLife',
    level: 'info'
  });
}
