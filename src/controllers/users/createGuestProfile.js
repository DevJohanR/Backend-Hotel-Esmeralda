const { guest_profile } = require("../../db");
const upload = require("../uploads3/multerConfig");

require("dotenv").config();

const createGuestProfile = async (req, res) => {
  try {
    const uploadPhoto = upload.single("photo");
    uploadPhoto(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const { full_name, phone_number, address, gender, document, country } =
        req.body;
      //console.log(full_name, phone_number, address, gender, document, country);

      if (
        !full_name ||
        !phone_number ||
        !address ||
        !gender ||
        !document ||
        !country ||
        !req.file
      ) {
        return res
          .status(400)
          .json({ message: "Falta información en los campos" });
      }

      const newGuestProfile = await guest_profile.create({
        ...req.body,
        photo_url: req.file.location,
      });
      res.status(200).json({
        message: "Su perfil se a creado correctamente",
        newGuestProfile: newGuestProfile,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createGuestProfile;
