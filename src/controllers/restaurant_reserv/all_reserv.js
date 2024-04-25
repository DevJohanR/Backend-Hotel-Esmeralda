const { restaurant_reserv } = require("../../db");

const allRestaurantReservation = async (req, res) => {
  try {
    const allReservations = await restaurant_reserv.findAll({
      model: restaurant_reserv,
    });
    res.status(200).json(allReservations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reservations",
      error: error.message,
    });
  }
};

module.exports = { allRestaurantReservation };
