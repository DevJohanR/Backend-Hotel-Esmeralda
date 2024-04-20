const { guest_profile } = require("../../db");
const upload = require("../uploads3/multerConfig");

const updateGuestProfilePhoto = async (req, res) => {
  try {
    const uploadPhoto = upload.single("photo");
    console.log("uploadPhoto", uploadPhoto);
    uploadPhoto(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Asegúrate de que el usuario proporcionó un ID de perfil de invitado
      if (!req.params.id) {
        return res
          .status(400)
          .json({ message: "ID de perfil de invitado requerido" });
      }

      // Busca el perfil de invitado por ID
      const guestProfile = await guest_profile.findByPk(req.params.id);
      if (!guestProfile) {
        return res
          .status(404)
          .json({ message: "Perfil de invitado no encontrado" });
      }

      // Actualiza el perfil de invitado con la nueva URL de la foto
      await guestProfile.update({
        photo_url: req.file.location,
      });

      res.status(200).json({
        message: "Foto del perfil actualizada correctamente",
        updatedGuestProfile: guestProfile,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateGuestProfilePhoto;
