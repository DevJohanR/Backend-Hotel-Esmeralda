const { users, guest_profile, Op } = require("../../db");

const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const { id } = req.params;

    // Consultar todos los usuarios en la base de datos
    let allUsers = role
      ? await users.findAll({
          where: { role },
          include: [{ model: guest_profile }],
        })
      : await users.findAll({
          include: [{ model: guest_profile }],
        });
    if (id) {
      allUsers = allUsers.filter((user) => user.id === id);
    }

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
