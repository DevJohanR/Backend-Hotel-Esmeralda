const { users } = require('../../db');
const jwt = require('jsonwebtoken');

const confirmEmail = async (req, res) => {
  try {
    const token = req.params.verificationCode;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await users.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'El correo electrónico ya ha sido verificado.' });
    }

    user.emailVerified = true;
    await user.save();

    return res.status(200).json({ message: 'Correo electrónico verificado con éxito.' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido.' });
    } else {
      return res.status(500).json({ message: 'Error al verificar el correo electrónico.' });
    }
  }
};

module.exports = { confirmEmail };
