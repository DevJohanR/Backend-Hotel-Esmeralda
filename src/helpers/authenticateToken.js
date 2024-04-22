const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const { verify } = req.headers;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("No se proporcionó el token");
    return res.sendStatus(401);
  }

  const [bearer, token] = authHeader.split(" ");

  if (!token || bearer.toLowerCase() !== "bearer") {
    console.error("Formato de token inválido");
    return res.sendStatus(401);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          console.error("Token expirado:", error);
          return res.status(401).json({ msg: "Token expired" });
        } else {
          console.error("Token inválido:", error);
          return res.sendStatus(403).json(error);
        }
      }

      if (verify === "HotelR&S**2024") return res.status(201).json({ user });

      req.user = user;
      return next();
    });
  } catch (error) {
    console.error("Error al autenticar el Token:", error);
    return res.status(401).json({ msg: "Error al autenticar el Token" });
  }
};

module.exports = {
  authenticateToken,
};
