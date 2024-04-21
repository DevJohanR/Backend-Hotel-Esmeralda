const {
  user_reservations,
  reservations,
  rooms,
  spa_reservations,
  car_reservations,
  car_details,
  room_spa,
  restaurant_reserv,
} = require("../../db");

const getUserReservations = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Buscar todas las reservas del usuario con la información relacionada
    const userReservations = await user_reservations.findAll({
      where: { user_id: userId },
      include: [
        { model: reservations, include: [{ model: rooms }] },
        { model: car_reservations, include: [{ model: car_details }] },
        { model: spa_reservations , include: [{ model: room_spa}]},
        { model: restaurant_reserv },
      ],
    });

    // Devolver todas las reservas, incluso si no existen
    res.status(200).json(userReservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    res.status(500).json({
      message: "Error fetching user reservations",
      error: error.message,
    });
  }
};

module.exports = { getUserReservations };
