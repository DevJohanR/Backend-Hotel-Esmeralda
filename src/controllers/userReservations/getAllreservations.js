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

const getAllReservations = async (req, res) => {
  try {
    const allReservations = await user_reservations.findAll({
      include: [
        {model: users , include: [guest_profile]},
        { model: rooms, include: [room_details, room_types] },
        { model: car_details },
        { model: room_spa },
        { model: restaurant_reserv },
      ],
    });
    res.status(200).json(allReservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { getAllReservations };
