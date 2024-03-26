const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { users } = require('../../db'); 

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Verificar si el email o username ya están registrados
    const userExists = await users.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    }); 
    if (userExists) {
      return res.status(409).json({ message: 'El correo electrónico o el nombre de usuario ya están en uso.' });
    }
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10); 
    // Crear el usuario
    const newUser = await users.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register
};
