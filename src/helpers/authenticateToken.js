const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      console.error('No se proporcionó el token');
      return res.sendStatus(401);
  }

  const [bearer, token] = authHeader.split(' ');

  if (!token || bearer.toLowerCase() !== 'bearer') {
      console.error('Formato de token inválido');
      return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
          console.error('Token inválido:', error);
          return res.sendStatus(403);
      }

      req.user = user;
      next();
  });
};

module.exports = {
 authenticateToken,
};
