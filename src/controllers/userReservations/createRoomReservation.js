const sequelize = require("../../db");

const createRoomReservation = async (req, res) => {
  const { user_id, room_id, check_in_date, check_out_date } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const roomReservation = await sequelize.models.RoomReservation.create(
        {
          user_id,
          room_id,
          fecha_inicio: check_in_date,
          fecha_fin: check_out_date,
        },
        { transaction: t }
      );

      return roomReservation;
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating room reservation:", error);
    res.status(500).json({ message: "Error creating room reservation" });
  }
};

module.exports = { createRoomReservation };
