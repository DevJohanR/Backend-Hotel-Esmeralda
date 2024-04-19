const { room_spa } = require("../../db");

const createOrUpdateRoomSpa = async (req, res) => {
  try {
    const {
      id,
      spa_room,
      name,
      description,
      service_type,
      photos,
      max_capacity,
      price,
      room_status,
    } = req.body;

    let roomSpa;

    if (id) {
      const [updatedRows] = await room_spa.update(
        {
          spa_room,
          name,
          description,
          service_type,
          photos,
          max_capacity,
          price,
          room_status,
        },
        {
          where: { id: id },
        }
      );

      if (updatedRows > 0) {
        roomSpa = await room_spa.findByPk(id);
      } else {
        throw new Error("No se pudo actualizar la sala spa.");
      }
    } else {
      roomSpa = await room_spa.create({
        spa_room,
        name,
        description,
        service_type,
        photos,
        max_capacity,
        price,
        room_status,
      });
    }

    const allRoomSpa = await room_spa.findAll();

    res.status(201).json({
      roomSpa: roomSpa,
      allRoomSpa: allRoomSpa,
      message: "Operación de 'update or create' completada correctamente.",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Error en la operación de "update or create".',
        error: error.message,
      });
  }
};

module.exports = { createOrUpdateRoomSpa };
