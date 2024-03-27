const { guest_profile } = require('../../db');

const createGuestProfile = async (req, res) => {

    try {

        const { full_name, phone_number, address, photo_url, gender,document,country } = req.body
        if (full_name && phone_number && address && photo_url && gender && document && country) {
            const newGuestProfile = await guest_profile.create(req.body)
            res.status(200).json({ message: "Su perfil se a creado correctamente", newGuestProfile: newGuestProfile })
        }

        else {
            res.status(400).jason({ message: "Falta informacion en los campos" })
        }
    }

    catch (error) {
        res.status(500).json({ error: error.message })
    }


}



module.exports = createGuestProfile