const models = require('../db/models');
const cryptService = require('./crypt-service')();
const jwtService = require('./jwt-service')();
const userService = require('./user-service')(models.User, cryptService, jwtService);

module.exports = {
  cryptService,
  jwtService,
  userService,
};
