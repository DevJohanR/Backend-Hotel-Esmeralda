const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");

// Función para generar un token JWT de un solo uso
const generateEmailVerificationToken = (email, username) => {
  try {
    const token = jwt.sign({ email, username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("Token generado:", token);

    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

// Función para generar un token JWT para restablecer la contraseña
const generatePasswordReset = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "5m",
      password_reset: true, 
    });
    console.log("Token generado:", token);

    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

const generateAuthToken = (userId, username, email, role) => {
  try {
    return jwt.sign(
      { id: userId, username, email, role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

module.exports = {
  generateEmailVerificationToken,
  generateAuthToken,
  generatePasswordReset,
};
