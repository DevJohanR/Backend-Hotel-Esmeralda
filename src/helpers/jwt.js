const jwt = require("jsonwebtoken");

// Función para generar un token JWT de un solo uso
const generateEmailVerificationToken = (email) => {
  try {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24h" });
  } catch (error) {
    console.error(
      "Error al generar el token de verificación de correo electrónico:",
      error
    );
    throw error;
  }
};

// Función para generar un token JWT para autenticación
const generateAuthToken = (userId, username, email) => {
  try {
    return jwt.sign({ id: userId, username, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

module.exports = {
   generateEmailVerificationToken,
   generateAuthToken
 };
 