const { room_spa } = require('../../db');

const allSpaServices = async (req, res) => {
    try {
        const allRoomSpa = await room_spa.findAll();

        if (allRoomSpa.length === 0) {
            return res.status(404).json({ message: 'No se encontraron servicios de spa.' });
        }

        res.status(200).json(allRoomSpa);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios de spa.', error: error.message });
    }
}

exports.allSpaServices = allSpaServices;
