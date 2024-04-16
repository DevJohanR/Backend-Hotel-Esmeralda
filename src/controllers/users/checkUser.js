const { users } = require('../../db');

const checkUserExists = async (req, res, next) => {
  try {
    const { username, email } = req.query;

    // Verificar si el usuario existe en la base de datos
    let user;
    if (email) {
      user = await users.findOne({
        where: { email }
      });
    } else if (username) {
      user = await users.findOne({
        where: { username }
      });
    }

    if (user) {
      return res.status(200).json({ message: 'El usuario está registrado.' });
    } else {
      return res.status(404).json({ message: 'El usuario no está registrado.' });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkUserExists
};
