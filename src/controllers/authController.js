// controllers/authController.js
// Johan estuvo aqui xD!
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { users } = require('../models/users'); // Asegúrate de que la ruta sea la correcta

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
    const hashedPassword = await bcrypt.hash(password, 10); // El número indica "salt rounds"
    
    // Crear el usuario
    const newUser = await users.create({
      username,
      email,
      password: hashedPassword,
      //  aquí los campos adicionales  como 'role' etc, etc
    });

    // Crear y asignar un JWT
    const token = jwt.sign(
      { user_id: newUser.id, username },
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Respondiendo con el token y la información del usuario
    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        
      },
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register
};
