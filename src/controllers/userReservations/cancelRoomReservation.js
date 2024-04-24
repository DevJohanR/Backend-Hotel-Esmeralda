const sequelize = require("../../db");

const cancelRoomReservation = async (req, res) => {
  const { reservation_id } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const [updated] = await sequelize.models.UserReservations.update(
        {
          status: "cancelled",
        },
        {
          where: { id: reservation_id },
          returning: true,
          transaction: t,
        }
      );

      if (updated[0] === 0) {
        throw new Error("No se encontró la reservación para cancelar");
      }

      return updated[1][0];
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({ message: "Error cancelling reservation" });
  }
};

module.exports = { cancelRoomReservation };
