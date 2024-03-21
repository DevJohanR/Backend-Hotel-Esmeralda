const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No tienes permisos para este tipo de consultas' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user;
    next();
  });
};

module.exports = {
    authenticateToken
    };
