const { users, guest_profile } = require('../../db');

const getAllUsers = async (req, res, next) => {
  try {
    // Consultar todos los usuarios en la base de datos
    const allUsers = await users.findAll();
    if (allUsers.length <= 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios.' });
    }

   
    const completeInfo = await Promise.all(allUsers.map(async (user) => {
      const guest = await guest_profile.findOne({ where: { user_id: user.id } });
      if (guest) {
        return { ...user, guest_profile: guest};
      } else {
        return user;
      }
    }));

    res.status(200).json(completeInfo);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers
};

