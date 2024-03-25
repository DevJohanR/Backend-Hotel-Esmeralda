const { guest_profile } = require('../../db');

const deleteGuestProfile = async (req, res) => {
    const { user_id } = req.params

    try {
        const deleteguest = await guest_profile.findOne({ where: { user_id } })

        if (deleteguest) {
            await deleteguest.destroy({ paranoid: true })
            res.status(200).json({ message: "Se a eleminado correctamente" })
        }
        else {
            res.status(404).json({ message: "no se a encontrado" })
        }

    }

    catch (error) {
        res.status(500).json({ error: error.message })
    }

}

module.exports = deleteGuestProfile