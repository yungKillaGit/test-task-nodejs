const bcrypt = require('bcrypt');

const salt = 8;
module.exports = () => ({
  crypt: (data) => bcrypt.hash(data, salt),
  isMatched: (data, hash) => bcrypt.compare(data, hash),
});
