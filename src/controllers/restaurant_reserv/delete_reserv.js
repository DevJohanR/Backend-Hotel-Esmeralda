const { restaurant_reserv } = require("../../db");

const deleteRestaurantReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservationToDelete = await restaurant_reserv.findByPk(id);
    if (!reservationToDelete) {
      return res.status(404).json({ message: "Reservation not found." });
    }
    await reservationToDelete.destroy();

    res.status(200).json({ message: "Reservation removed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error when deleting reservation",
        error: error.message,
      });
  }
};

module.exports = { deleteRestaurantReservation };
