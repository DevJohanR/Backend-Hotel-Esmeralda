const { user_reservations } = require("../../db");

const getAllReservations = async (req, res) => {
  try {
    const allReservations = await user_reservations.findAll();
    res.status(200).json(allReservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { getAllReservations };
