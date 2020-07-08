const users = (userService, cryptService) => ({
  login: (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
      res.status(400).json({ error: { message: 'Bad request' } });
    }
    userService.login(req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        if (!err.code) {
          res.status(500).json({ error: { message: err.message } });
        }
        res.status(err.code).json({ error: { message: err.message } });
      });
  },
  changeFullName: (req, res) => {
    if (!req.body.fullName) {
      res.status(400).json({ error: { message: 'Bad request' } });
    }
    userService.updateById(req.userId, { fullName: req.body.fullName })
      .then((result) => {
        res.status(200).json({ user: result });
      })
      .catch((err) => {
        res.status(err.code).json({ error: { message: err.message } });
      });
  },
  changeEmail: (req, res) => {
    if (!req.body.email) {
      res.status(400).json({ error: { message: 'Bad request' } });
    }
    userService.updateById(req.userId, { email: req.body.email })
      .then((result) => {
        res.status(200).json({ user: result });
      })
      .catch((err) => {
        res.status(err.code).json({ error: { message: err.message } });
      });
  },
  changePassword: async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: { message: 'Bad request' } });
    }
    userService.validatePassword(req.userId, currentPassword, newPassword)
      .then(async (validationErrors) => {
        if (validationErrors.length !== 0) {
          res.status(422).json({ errors: validationErrors });
        }
        const hashedPassword = await cryptService.crypt(newPassword);
        userService.updateById(req.userId, { passwordHash: hashedPassword })
          .then((result) => {
            res.status(200).json({ user: result });
          })
          .catch((err) => {
            res.status(err.code).json({ error: { message: err.message } });
          });
      })
      .catch((err) => {
        res.status(err.code).json({ error: { message: err.message } });
      });
  },
});

module.exports = users;
