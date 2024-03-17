const { Rooms, RoomDetails } = require('../models'); // Asegúrate de que la importación coincida con tus modelos

// Crear
exports.createRoom = async (req, res) => {
  try {
    const room = await Rooms.create(req.body);
    res.status(201).send(room);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Listar 
exports.listRooms = async (req, res) => {
  try {
    const { status, type_rooms } = req.query;
    const whereClause = {};
    if (status) whereClause.status = status;
    if (type_rooms) whereClause.type_rooms = type_rooms;

    const rooms = await Rooms.findAll({ where: whereClause });
    res.status(200).send(rooms);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Obtener detalles
exports.getRoomDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Rooms.findByPk(id, {
      include: [{ model: RoomDetails, as: 'details' }] // Asegúrate de que las asociaciones estén correctamente definidas en tus modelos
    });
    if (!room) {
      return res.status(404).send('Room not found');
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Actualizar
exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Rooms.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedRoom = await Rooms.findByPk(id);
      res.status(200).send(updatedRoom);
    } else {
      throw new Error('Room not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
