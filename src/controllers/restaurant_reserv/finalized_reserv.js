const { restaurant_reserv } = require("../../db");

const finalizedRestaurantReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservationFinalized = await restaurant_reserv.findByPk(id);
    if (!reservationFinalized) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    reservationFinalized.status = "finalized";
    await reservationFinalized.save();

    res.status(200).json({ message: "Reservation finalized." });
  } catch (error) {
    res.status(500).json({
      message: "Error when finalized reservation",
      error: error.message,
    });
  }
};

module.exports = { finalizedRestaurantReservation };
