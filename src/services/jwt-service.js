const jwt = require('jsonwebtoken');

const secret = '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009';
const jwtService = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      res.status(401);
    }
    return jwt.verify(token, secret, (err, userId) => {
      if (err) {
        res.status(403);
      }
      req.userId = userId;
      next();
    });
  },
  generateToken: (userId) => jwt.sign(userId, secret),
};

module.exports = () => jwtService;
