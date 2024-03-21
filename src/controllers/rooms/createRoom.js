const { rooms, room_types, room_details } = require('../../db');

const createRoom = async (req, res) => {
    try {
        // Primero, busca el tipo de habitación por su nombre para obtener el ID
        const roomType = await room_types.findOne({
            where: { name: req.body.type_rooms }
        });

        if (!roomType) {
            return res.status(400).json({ message: 'Tipo de habitación no encontrado' });
        }

        // Luego, crea la habitación con el tipo de habitación asociado
        const newRoom = await rooms.create({
            room_number: req.body.room_number,
            type_id: roomType.id, 
            status: req.body.status,
            price_per_night: req.body.price_per_night,
            description: req.body.description,
            max_capacity: req.body.max_capacity,
            photo_url: req.body.photo_url,
        });

        // Ahora, crea los detalles de la habitación asociados
        const newRoomDetails = await room_details.create({
            room_id: newRoom.id,
            single_bed: req.body.single_bed,
            double_bed: req.body.double_bed,
            air_conditioning: req.body.air_conditioning,
            jacuzzi: req.body.jacuzzi,
            internet_connection: req.body.internet_connection,
            tv: req.body.tv,
            minibar: req.body.minibar,
            phone: req.body.phone,
        });

        res.status(201).json({
            newRoom: newRoom,
            newRoomDetails: newRoomDetails,
            message: "Habitación creada correctamente",
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la habitación', error: error.message });
    }
};

module.exports = { createRoom };
