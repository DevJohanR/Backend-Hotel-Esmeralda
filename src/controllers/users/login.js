const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { users } = require("../../db");
const { generateToken } = require("../../helpers/jwt");

const login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Verificar si se proporciona un valor para usernameOrEmail
    if (!usernameOrEmail) {
      return res
        .status(400)
        .json({
          message: "El nombre de usuario o correo electrónico es requerido.",
        });
    }

    // Verificar si el usuario existe
    const user = await users.findOne({
      where: {
        [Op.or]: [
          { email: usernameOrEmail },
          { username: usernameOrEmail },
        ].filter(Boolean), // Filtrar elementos undefined o null
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({
          message:
            "El correo electrónico o el nombre de usuario son incorrectos.",
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          message: "El correo electrónico o la contraseña son incorrectos.",
        });
    }

    const token = generateToken(user.id, user.username, user.email);
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
