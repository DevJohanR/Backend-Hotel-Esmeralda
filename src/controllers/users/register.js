const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { users } = require('../../db');
const { sendConfirmationEmail } = require('../email/emailService'); 
const { generateEmailVerificationToken } = require('../../helpers/jwt');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await users.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (userExists) {
      return res.status(409).json({ message: 'El correo electrónico o el nombre de usuario ya están en uso.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

 
    const newUser = await users.create({
      username,
      email,
      password: hashedPassword,
    });

    const verificationToken = generateEmailVerificationToken(email);

    await sendConfirmationEmail({ username, email,verificationCode : verificationToken});
    console.log('Correo de confirmación enviado:', email); 

    return res.status(201).json({
      message: 'Usuario registrado con éxito. Se ha enviado un correo electrónico de verificación.',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register
};
