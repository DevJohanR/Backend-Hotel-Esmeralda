const { users, guest_profile} = require('../../db'); 

const updateProfile = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.params, req.body);
    const { userId } = req.params; 
    const { fullName, phoneNumber, document, country, address, photoUrl, gender } = req.body; 

    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    let guestProfile = await  guest_profile.findOne({ where: { user_id: userId } });
    if (guestProfile) {
      await guestProfile.update({
        full_name: fullName,
        phone_number: phoneNumber,
        document: document,
        country: country,
        address: address,
        photo_url: photoUrl,
        gender: gender,
      });
    } else {
      guestProfile = await guest_profile.create({
        user_id: userId,
        full_name: fullName,
        phone_number: phoneNumber,
        document: document,
        country: country,
        address: address,
        photo_url: photoUrl,
        gender: gender,
      });
    }

    const updatedUser = await users.findByPk(userId,
        {
        include: {
          model: guest_profile,
          as: 'guest_profile',
          required: false,
        },
      });

    res.status(200).json({ 
        "message": "Perfil actualizado correctamente",
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
