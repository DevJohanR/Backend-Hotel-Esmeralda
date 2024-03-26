const jwt = require('jsonwebtoken');

const generateToken = (userId, username, email) => {
 try {
    return jwt.sign({ id: userId, username, email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
 } catch (error) {
    console.error('Error al generar el token:', error);
    throw error; // O maneja el error de la manera que prefieras
 }
};

module.exports = {
 generateToken
};

