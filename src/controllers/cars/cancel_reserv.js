const { car_reservations, connect } = require("../../db");

const cancelCarReservation = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;

    const reservationToCancel = await car_reservations.findByPk(id);
    if (!reservationToCancel) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    // Cambiar el estado de la reserva a 'cancelled'
    reservationToCancel.status = "cancelled";
    await reservationToCancel.save({ transaction });
    await transaction.commit();

    // Obtener todas las reservas restantes después de cancelar la reserva
    const remainingReservations = await car_reservations.findAll();

    return res
      .status(200)
      .json({ message: "Reservation cancelled successfully." });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Error when cancelling reservation",
      error: error.message,
    });
  }
};

module.exports = { cancelCarReservation };
