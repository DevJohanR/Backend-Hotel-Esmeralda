// controllers/restaurant_reserv/all_reserv.js

const { restaurant_reserv } = require("../../db");

const getAllRestaurantReservations = async (req, res) => {
  try {
    // Utiliza el método findAll para obtener todas las reservaciones
    // y luego mapea el resultado para extraer solo los IDs
    const reservationIds = await restaurant_reserv
      .findAll({
        attributes: ["id"], // Solo selecciona el atributo 'id'
      })
      .map((reservation) => reservation.id);

    if (reservationIds.length === 0) {
      return res.status(404).json({ message: "No reservations found." });
    }

    // Devuelve solo los IDs de las reservaciones
    return res.status(200).json({
      reservationIds: reservationIds,
      message: "Reservation IDs successfully retrieved.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error retrieving reservation IDs.",
      error: error.message,
    });
  }
};

module.exports = { getAllRestaurantReservations };

// const getAllRestaurantReservations = async (req, res) => {
//   try {
//     // Buscar todas las reservas en la base de datos
//     const reservations = await restaurant_reserv.findAll();

//     // Verificar si hay reservas
//     if (reservations.length === 0) {
//       return res.status(404).json({ message: "No reservations found." });
//     }

//     // Convertir cada reserva a un objeto JSON para enviarla en la respuesta
//     const reservationsJson = reservations.map((reservation) =>
//       reservation.toJSON()
//     );

//     // Enviar las reservas en la respuesta
//     return res.status(200).json({
//       reservations: reservationsJson,
//       message: "Reservations successfully retrieved.",
//     });
//   } catch (error) {
//     // Manejar errores
//     console.error(error);
//     return res.status(500).json({
//       message: "Error retrieving reservations.",
//       error: error.message,
//     });
//   }
// };

// module.exports = { getAllRestaurantReservations };
