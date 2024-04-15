const { users, guest_profile } = require('../../db');

const userInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const userWithProfile = await users.findOne({
      where: { id: userId },
      include: [{
        model: guest_profile,
        as: 'guest_profile',
        required: false 
      }]
    });

    if (!userWithProfile) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Extraer la información relevante del usuario y del perfil de invitado
    let userInfo = {
      id: userWithProfile.id,
      username: userWithProfile.username,
      email: userWithProfile.email,
      role: userWithProfile.role,
      emailVerified: userWithProfile.emailVerified,
      is_active: userWithProfile.is_active,
    };

    // Verifica si hay información de guest_profile disponible
    if (userWithProfile.guest_profile) {
      userInfo = {
        ...userInfo,
        full_name: userWithProfile.guest_profile.full_name,
        phone_number: userWithProfile.guest_profile.phone_number,
        address: userWithProfile.guest_profile.address,
        photo_url: userWithProfile.guest_profile.photo_url,
        gender: userWithProfile.guest_profile.gender,
        birth: userWithProfile.guest_profile.birth,
        document: userWithProfile.guest_profile.document,
        country: userWithProfile.guest_profile.country,
        
      };
    }

    // Enviar la información del usuario como respuesta
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  userInfo
};
