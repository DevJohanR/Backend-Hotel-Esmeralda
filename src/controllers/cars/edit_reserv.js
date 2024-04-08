const { Sequelize } = require("sequelize");
const { car_reservations, connect } = require("../../db");

const editCarReservation = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;
    const { checkInDateTime, checkOutDateTime, status } = req.body;

    const reservationToUpdate = await car_reservations.findByPk(id);
    if (!reservationToUpdate) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    const updatedReservation = await reservationToUpdate.update(
      {
        checkInDateTime: checkInDateTime
          ? new Date(checkInDateTime)
          : reservationToUpdate.checkInDateTime,
        checkOutDateTime: checkOutDateTime
          ? new Date(checkOutDateTime)
          : reservationToUpdate.checkOutDateTime,
        status: status || reservationToUpdate.status,
      },
      { transaction }
    );

    await transaction.commit();
    return res
      .status(200)
      .json({
        message: "Reservation updated successfully.",
        reservation: updatedReservation,
      });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error when editing reservation",
        error: error.message,
      });
  }
};

module.exports = { editCarReservation };
