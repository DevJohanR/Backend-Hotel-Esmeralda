const {
  user_reservations,
  reservations,
  spa_reservations,
  car_reservations,
  restaurant_reserv,
} = require("../../db");

const getUserReservations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Buscar todas las reservas del usuario en la tabla user_reservations
    const userReservations = await user_reservations.findAll({
      where: { user_id: userId }, // Asegúrate de que userId sea una cadena de texto
      include: [
        { model: reservations },
        { model: spa_reservations },
        { model: car_reservations },
        { model: restaurant_reserv },
      ],
    });

    if (userReservations.length === 0) {
      return res.status(200).json({ message: "El usuario no tiene reservas." });
    }

    const formattedReservations = userReservations.map((userReservation) => {
      const roomReservationStatus = userReservation.reservation
        ? userReservation.reservation.status
        : null;

      const spaReservationStatus = userReservation.spa_reservation
        ? userReservation.spa_reservation.status
        : null;

      const carReservationStatus = userReservation.carReservation
        ? userReservation.carReservation.status
        : null;

      const restaurantReservationStatus = userReservation.restaurantReservation
        ? userReservation.restaurantReservation.status
        : null;

      return {
        user_reservation_id: userReservation.id,
        room_reservation_status: roomReservationStatus,
        spa_reservation_status: spaReservationStatus,
        car_reservation_status: carReservationStatus,
        restaurant_reservation_status: restaurantReservationStatus,
      };
    });

    res.status(200).json(formattedReservations);
  } catch (error) {
    console.error("Error al obtener las reservas del usuario:", error);
    res
      .status(500)
      .json({ message: "Error al obtener las reservas del usuario" });
  }
};

module.exports = { getUserReservations };
