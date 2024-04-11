const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { users } = require("../../db");
const { generateAuthToken } = require("../../helpers/jwt");

const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log("Datos recibidos en el backend:", { usernameOrEmail, password });
  try {
    if (!usernameOrEmail) {
      return res.status(400).json({
        message: "El nombre de usuario o correo electrónico es requerido.",
      });
    }
    const user = await users.findOne({
      where: {
        [Op.or]: [
          { email: usernameOrEmail },
          { username: usernameOrEmail },
        ].filter(Boolean),
      },
    });

    if (!user) {
      return res.status(401).json({
        message:
          "El correo electrónico o el nombre de usuario son incorrectos.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "El correo electrónico o la contraseña son incorrectos.",
      });
    }

    const token = generateAuthToken(
      user.id,
      user.username,
      user.email,
      user.role
    );

    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  login,
};
