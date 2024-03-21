const jwt = require('jsonwebtoken');

const generateToken = (userId, username, email) => {
  return jwt.sign({ id: userId, username, email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

module.exports = {
  generateToken
};
