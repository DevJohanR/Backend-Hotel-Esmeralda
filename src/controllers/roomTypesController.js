const { rooms, room_details } = require("../db");
const { connect } = require("../db");

// Crear
exports.createRoomType = async (req, res) => {
  try {
    //Creating roomType
    const newRoomType = await connect.models.room_types.create({
      name: req.body.name,
      description: req.body.description,
    });

    res.status(201).json({
      message: "Room Type Created successfully!",
      roomType: newRoomType,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "The Room Type already exist!" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
// Listar habitaciones
exports.listRoomTypes = async (req, res) => {
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
exports.getTypeInfoById = async (req, res) => {
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
exports.updateRoomTypeById = async (req, res) => {
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
exports.deleteRoomTypeById = async (req, res) => {
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
