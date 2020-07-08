const express = require('express');

module.exports = (userRouter, jwtService) => {
  const router = express.Router();
  router.post('/login', userRouter.login);
  router.patch('/users/full-name', jwtService.authenticateToken, userRouter.changeFullName);
  router.patch('/users/email', jwtService.authenticateToken, userRouter.changeEmail);
  router.patch('/users/password', jwtService.authenticateToken, userRouter.changePassword);
  return router;
};
