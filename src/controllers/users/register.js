const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { users } = require('../../db');
const { sendConfirmationEmail } = require('../email/emailService');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await users.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    });

    if (userExists) {
      return res.status(409).json({ message: 'El usuario o correo electrónico ya están en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({
      username,
      email,
      password: hashedPassword,
      emailVerified: false // Asegúrate de tener este campo en tu modelo.
    });

    // Generar token para confirmación de correo electrónico
    const confirmationToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Expire en 24 horas
    );

    // Enviar correo electrónico de confirmación
    await sendConfirmationEmail({
      username: newUser.username,
      email: newUser.email,
      confirmationToken,
    });

    return res.status(201).json({
      message: 'Usuario registrado. Revisa tu correo electrónico para confirmar tu cuenta.',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al registrar el usuario.' });
  }
};

module.exports = { register };
