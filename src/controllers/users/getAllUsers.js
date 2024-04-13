const { users, guest_profile } = require("../../db");

const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;

    // Consultar todos los usuarios en la base de datos
    const allUsers = role
      ? await users.findAll({ where: { role } })
      : await users.findAll({ include: [{ model: guest_profile }] });
    u;

    // Verificar si se encontraron usuarios
    if (allUsers.length > 0) {
      return res
        .status(200)
        .json({ message: "Usuarios encontrados:", users: allUsers });
    } else {
      return res.status(404).json({ message: "No se encontraron usuarios." });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
};
