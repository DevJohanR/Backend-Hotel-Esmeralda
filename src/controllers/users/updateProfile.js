const { users, guest_profile } = require("../../db");

const updateProfile = async (req, res) => {
  try {
    console.log(
      "Archivo cargado:",
      req.file ? req.file : "No se cargó ningún archivo"
    );

    const { userId } = req.params;
    const {
      full_name,
      phone_number,
      document,
      country,
      address,
      gender,
      birth,
    } = req.body;

    // const user = await users.findByPk(userId);
    // if (!user) {
    //   return res.status(404).json({ error: "Usuario no encontrado" });
    // }

    let guestProfile = await guest_profile.findOne({
      where: { user_id: userId },
    });
    if (!guestProfile) {
      guestProfile = await guest_profile.create({
        user_id: userId,
        full_name,
        phone_number,
        document,
        country,
        address,
        gender,
        birth,
      });
      const updatedUser = await users.findByPk(
        { id: userId },
        {
          include: {
            model: guest_profile,
            as: "guest_profile",
            required: false,
          },
        }
      );
      return res.status(201).json({
        user: updatedUser,
        message: "Guest profile created",
      });
    }

    // Verificar si se subió un nuevo archivo de foto
    const photoUrl = req.file ? req.file.location : guestProfile.photo_url;

    await guestProfile.update({
      full_name,
      phone_number,
      document,
      country,
      address,
      photo_url: photoUrl,
      gender,
      birth,
    });

    const updatedUser = await users.findByPk(userId, {
      include: {
        model: guest_profile,
        as: "guest_profile",
        required: false,
      },
    });

    res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  updateProfile,
};
