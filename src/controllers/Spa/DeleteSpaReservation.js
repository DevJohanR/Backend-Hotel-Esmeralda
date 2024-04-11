const { spa_reservations, connect } = require("../../db");

const cancelSpaReservation = async (req, res) => {
    const transaction = await connect.transaction();
    try {
        const { id } = req.params;

const reservationToBeCanceled = await spa_reservations.findByPk(id);
if (!reservationToBeCanceled){
    return res.status(404).json({ message: "Reservation not found." });
}

reservationToBeCanceled.status = "cancelled";
await reservationToBeCanceled.save({ transaction });
await transaction.commit();


const remainingReservations = await spa_reservations.findAll();

return res.status(200).json({message: "Reservation cancelled successfully." })
    } catch (error) {
        await transaction.rollback();
    console.error(error);
    return res.status(500).json({
      message: "There's been an error when cancelling reservation",
      error: error.message,
      updatedList: remainingReservations,
    });
}
};

module.exports = {cancelSpaReservation};