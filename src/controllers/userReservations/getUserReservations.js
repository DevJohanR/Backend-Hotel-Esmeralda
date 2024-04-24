const {
  user_reservations,
  rooms,
  car_details,
  room_types,
  room_details,
  room_spa,
  restaurant_reserv,
  users,
  guest_profile,
} = require("../../db");

const getUserReservations = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userReservations = await user_reservations.findAll({
      where: { user_id: userId },
      include: [
        {model: users, include: [guest_profile]},
        { model: rooms, include: [room_details], include: [room_types]},
        { model: car_details },
        { model: room_spa},
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
