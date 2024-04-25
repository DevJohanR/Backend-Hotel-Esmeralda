const { restaurant_reserv } = require("../../db");

const confirmRestaurantReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservationToConfirm = await restaurant_reserv.findByPk(id);
    if (!reservationToConfirm) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    reservationToConfirm.status = "confirmed";
    await reservationToConfirm.save();

    res.status(200).json({ message: "Reservation confirmed." });
  } catch (error) {
    res.status(500).json({
      message: "Error when confirmed reservation",
      error: error.message,
    });
  }
};

module.exports = { confirmRestaurantReservation };
