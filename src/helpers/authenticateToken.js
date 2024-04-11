//helpers/authenticateToken.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);

  if (!authHeader) {
    console.error("No se proporcionó el token");
    return res.sendStatus(401);
  }

  const [bearer, token] = authHeader.split(" ");

  if (!token || bearer.toLowerCase() !== "bearer") {
    console.error("Formato de token inválido");
    return res.sendStatus(401);
  }
  console.log(token);

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        console.error("Token inválido:", error);
        return res.sendStatus(403).json(error);
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ msg: "Error al autenticar el Token" });
  }
};

module.exports = {
  authenticateToken,
};
