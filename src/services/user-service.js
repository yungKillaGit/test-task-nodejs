const userService = (User, cryptService, jwtService) => ({
  login: ({ email, password }) => {
    return User.findOne({
      where: {
        email,
      },
    }).then(async (user) => {
      if (!user) {
        const notFoundError = new Error('User was not found');
        notFoundError.code = 404;
        throw notFoundError;
      }
      const isPasswordMatched = await cryptService.isMatched(password, user.passwordHash);
      if (!isPasswordMatched) {
        const incorrectPasswordError = new Error('Incorrect password');
        incorrectPasswordError.code = 401;
        throw incorrectPasswordError;
      }
      return {
        authToken: jwtService.generateToken(user.id),
        user,
      };
    });
  },
  updateById: (userId, data) => {
    return User.findByPk(userId)
      .then((user) => {
        if (!user) {
          const notFoundError = new Error('User was not found');
          notFoundError.code = 404;
          throw notFoundError;
        }
        return user.update(data).then((updatedUser) => updatedUser)
          .catch((err) => {
            const validationError = new Error(err.message.replace('Validation error: ', ''));
            validationError.code = 422;
            throw validationError;
          });
      });
  },
  validatePassword: async (userId, currentPassword, newPassword) => {
    const errors = [];
    await User.findByPk(userId)
      .then(async (user) => {
        if (!(await cryptService.isMatched(currentPassword, user.passwordHash))) {
          const incorrectPasswordError = new Error('Incorrect password');
          incorrectPasswordError.code = 401;
          throw incorrectPasswordError;
        }
      });
    if (!(/^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ]).+$/.test(newPassword))) {
      errors.push({ message: 'Upper and lowercase letters' });
    }
    if (!(/\d/.test(newPassword))) {
      errors.push({ message: 'At least one number' });
    }
    if (newPassword.length <= 7) {
      errors.push({ message: '8 or more characters' });
    }
    return errors;
  },
});

module.exports = userService;
