const { rooms, room_details } = require('../db');
const { connect } = require('../db'); 

// Crear
exports.createRoom = async (req, res) => {
    try {
        // Habitacion
        const newRoom = await connect.models.rooms.create({
            room_number: req.body.room_number,
            type_rooms: req.body.type_rooms,
            status: req.body.status,
            price_per_night: req.body.price_per_night,
            description: req.body.description,
            max_capacity: req.body.max_capacity,
            is_active: req.body.is_active != null ? req.body.is_active : true
        });

        // detalles de la habitacion
        const newRoomDetails = await connect.models.room_details.create({
            room_id: newRoom.id,
            single_bed: req.body.single_bed,
            double_bed: req.body.double_bed,
            air_conditioning: req.body.air_conditioning,
            jacuzzi: req.body.jacuzzi,
            internet_connection: req.body.internet_connection,
            tv: req.body.tv,
            minibar: req.body.minibar,
            phone: req.body.phone
        });

        res.status(201).json({ message: 'Habitación y detalles creados exitosamente', room: newRoom, roomDetails: newRoomDetails });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'El número de habitación ya existe.' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};
// Listar habitaciones
exports.listRooms = async (req, res) => {
    try {
        const { status, type_rooms } = req.query;
        const whereClause = {};
        if (status) whereClause.status = status;
        if (type_rooms) whereClause.type_rooms = type_rooms;

        const allRooms = await rooms.findAll({ where: whereClause });
        res.status(200).send(allRooms);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Obtener detalles de una habitación
exports.getRoomDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await rooms.findByPk(id, {
            include: [{ model: room_details, as: 'room_detail' }] // Asegúrate de que las asociaciones estén correctamente definidas en tus modelos
        });
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.status(200).send(room);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Actualizar una habitación
// exports.updateRoom = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const room = await rooms.findByPk(id, {
//             include: [{ model: room_details, as: 'room_detail' }]
//         });
//         if (!room) {
//             return res.status(404).send('Room not found');
//         }

//         await connect.transaction(async (t) => {
//             await room.update(req.body, { transaction: t });

//             if (room.room_detail && req.body.room_detail) {
//                 await room.room_detail.update(req.body.room_detail, { transaction: t });
//             }
//         });
//         const updatedRoom = await rooms.findByPk(id, {
//             include: [{ model: room_details, as: 'room_detail' }]
//         });
//         res.status(200).send(updatedRoom);
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// };

