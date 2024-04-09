const { users, guest_profile } = require('../../db');

const updateProfile = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.params, req.body);
    const { userId } = req.params;
    const { full_name, phone_number, document, country, address, photo_url, gender,birth } = req.body;


    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    let guestProfile = await guest_profile.findOne({ where: { user_id: userId } });
    if (guestProfile) { 
      await guestProfile.update({
        full_name: full_name,
        phone_number: phone_number,
        document: document,
        country: country,
        address: address,
        photo_url: photo_url,
        gender: gender, 
        birth: birth,
      });
    } else {
      guestProfile = await guest_profile.create({
        user_id: userId,
        full_name: full_name,
        phone_number: phone_number,
        document: document,
        country: country,
        address: address,
        photo_url: photo_url,
        gender: gender,
        birth: birth,
      });
    }

    // Obtener el usuario actualizado con su perfil de invitado
    const updatedUser = await users.findByPk(userId, {
      include: {
        model: guest_profile,
        as: 'guest_profile',
        required: false,
      },
    });

    res.status(200).json({
      message: 'Perfil actualizado correctamente',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  updateProfile,
};
