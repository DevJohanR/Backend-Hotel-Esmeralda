const { restaurant_reserv } = require("../../db");

const editRestaurantReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservationToUpdate = await restaurant_reserv.findByPk(id);
    if (!reservationToUpdate) {
      return res.status(404).json({ message: "Reservation not found." });
    }
    const editedReservation = await reservationToUpdate.update(req.body);
    const reservationUpdated = await restaurant_reserv.findByPk(id);

    if (editedReservation && reservationUpdated) {
      // Opcional: Recuperar y enviar todas las reservas restantes
      // const allReservations = await restaurant_reserv.findAll();
      // return res.status(200).json({
      //   editedReservation: reservationUpdated.toJSON(),
      //   allReservations: allReservations.map((d) => d.toJSON()),
      //   message: "Correctly updated reservation and list of all reservations.",
      // });

      return res.status(200).json({
        editedReservation: reservationUpdated.toJSON(),
        message: "Correctly updated reservation.",
      });
    } else {
      return res
        .status(400)
        .json({ message: "Could not update the reservation." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error when editing reservation",
        error: error.message,
      });
  }
};

module.exports = { editRestaurantReservation };
