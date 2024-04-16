const { restaurant_reserv } = require("../../db");

const cancelRestaurantReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservationToCancel = await restaurant_reserv.findByPk(id);
    if (!reservationToCancel) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    // Cambiar el estado de la reserva a 'cancelled'
    reservationToCancel.status = "cancelled";
    await reservationToCancel.save();

    res.status(200).json({ message: "Reservation cancelled successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error when cancelling reservation",
      error: error.message,
    });
  }
};

module.exports = { cancelRestaurantReservation };
