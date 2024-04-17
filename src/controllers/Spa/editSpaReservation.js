const { Sequelize } = require("sequelize");
const {spa_reservations , connect } = require("../../db");

const editSpaReservation = async (req, res) => {
    const transaction = await connect.transaction();
try {
    const { id } = req.params;
    const { checkInDateTime, checkOutDateTime, status } = req.body;

    const reservationToChange = await spa_reservations.findByPk(id);
    if(!reservationToUpdate) {
        return res.status(404).json({ message: "Reservation not found." });
    }

await reservationToChange.update(
    { checkInDateTime: checkInDateTime
        ? new Date(checkInDateTime)
        : reservationToUpdate.checkInDateTime,
      checkOutDateTime: checkOutDateTime
        ? new Date(checkOutDateTime)
        : reservationToUpdate.checkOutDateTime,
      status: status || reservationToUpdate.status,
    },
    { transaction }
);
const updatedRes = await spa_reservations.findByPk(id, { transaction, });

await transaction.commit();
return res.status(200).json({message:"reservaReservation updated successfully.",
reservation: updatedRes,
});

} catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({
      message: "There's been an error when editing reservation",
      error: error.message,
    });
}
};

module.exports = { editSpaReservation };