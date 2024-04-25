const { Sequelize } = require("sequelize");
const { restaurant_reserv, connect } = require("../../db");

const allRestaurantReservation = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).send("User ID is required");
    }

    const userReservations = await restaurant_reserv.findAll({
      where: { user_id },
    });

    if (!userReservations || userReservations.length === 0) {
      return res.status(404).send("No reservations found for this user");
    }

    return res.status(200).send(userReservations);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { allRestaurantReservation };
