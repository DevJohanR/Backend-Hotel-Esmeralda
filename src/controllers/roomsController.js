const { rooms, room_details } = require("../db");
const { connect } = require("../db");

// Crear
exports.createRoom = async (req, res) => {
  try {
    // Habitacion
    const newRoom = await connect.models.rooms.create({
      room_number: req.body.room_number,
      type_id: req.body.type_id,
      status: req.body.status,
      price_per_night: req.body.price_per_night,
      description: req.body.description,
      max_capacity: req.body.max_capacity,
      is_active: req.body.is_active != null ? req.body.is_active : true,
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
      phone: req.body.phone,
    });

    res.status(201).json({
      message: "Habitación y detalles creados exitosamente",
      room: newRoom,
      roomDetails: newRoomDetails,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "El número de habitación ya existe." });
    } else {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
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
      include: [{ model: room_details, as: "room_detail" }],
    });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    res.status(200).send(room);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Actualizar una habitación
exports.updateRoom = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;
    const { roomData, roomDetailsData } = req.body;

    let room = await rooms.findByPk(id, { transaction });
    if (!room) {
      await transaction.rollback();
      return res.status(404).send("Room not found");
    }
    await rooms.update(roomData, { where: { id: id }, transaction });
    if (roomDetailsData) {
      await room_details.update(roomDetailsData, {
        where: { room_id: id },
        transaction,
      });
    }
    await transaction.commit();
    res.status(200).send("Room updated successfully");
  } catch (error) {
    await transaction.rollback();
    res.status(500).send("Error updating room: " + error.message);
  }
  //Ejemplo de como se envia por postMan el body para actualizar la data en ambas tablas
  // {
  //     "roomData": {
  //       "room_number": "102",
  //       "type_rooms": "suite",
  //       "status": "busy",
  //       "price_per_night": 250,
  //       "description": "Una suite cómoda con vista al mar",
  //       "max_capacity": 4
  //     },
  //     "roomDetailsData": {
  //       "single_bed": 2,
  //       "double_bed": 1,
  //       "air_conditioning": true,
  //       "jacuzzi": false,
  //       "internet_connection": true,
  //       "tv": false,
  //       "minibar": true,
  //       "phone": true
  //     }
  //   }
};

//Eliminar Habitacion
exports.deleteRoom = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;

    const room = await rooms.findByPk(id, { transaction });
    if (!room) {
      await transaction.rollback();
      return res.status(404).send("Room not found");
    }

    // Eliminar primero los detalles de la habitación
    await room_details.destroy({ where: { room_id: id } }, { transaction });

    // Ahora eliminar la habitación
    await room.destroy({ transaction });

    await transaction.commit();
    res.status(200).send("Room deleted successfully");
  } catch (error) {
    await transaction.rollback();
    res.status(500).send("Error deleting room");
  }
};
