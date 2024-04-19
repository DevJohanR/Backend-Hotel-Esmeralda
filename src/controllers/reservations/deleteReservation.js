const { reservations } = require("../../db");
async function deleteReservation(req, res) {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).send({ message: "id is required" });

    const deleted = await reservations.destroy({
      where: {
        id: id,
      },
    });

    if (!deleted)
      return res.status(404).send({ message: "Reservation not found" });
    return res.send({ message: "Reservation deleted!", reservation: id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
}

module.exports = { deleteReservation };
