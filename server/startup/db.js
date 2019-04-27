const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  mongoose.connect('mongodb://127.0.0.1:27017/oneLife')
    .then(() => winston.info('Connected to MongoDB...'));
}
