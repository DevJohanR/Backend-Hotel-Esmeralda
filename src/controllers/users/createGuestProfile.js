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
        !country
      ) {
        return res
          .status(400)
          .json({ message: "Missing information in the fields" });
      }

      const newGuestProfile = await guest_profile.create({
        ...req.body,
      });
      res.status(200).json({
        message: "Your profile was created successfully",
        newGuestProfile: newGuestProfile,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createGuestProfile;
