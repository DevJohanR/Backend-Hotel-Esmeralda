const { car_reservations, connect } = require("../../db");

const deleteCarReservation = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;

    const reservationToDelete = await car_reservations.findByPk(id);
    if (!reservationToDelete) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    await reservationToDelete.destroy({ transaction });
    await transaction.commit();

    return res
      .status(200)
      .json({ message: "Reservation removed successfully." });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error when deleting reservation",
        error: error.message,
      });
  }
};

module.exports = { deleteCarReservation };
