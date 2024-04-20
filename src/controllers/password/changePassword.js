const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa tu modelo de usuario

// Controlador para cambiar la contraseña
const changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();


    const newToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Por ejemplo, 1 hora de validez
    });

    res.status(200).json({ message: 'Contraseña cambiada con éxito', newToken });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { changePassword };
