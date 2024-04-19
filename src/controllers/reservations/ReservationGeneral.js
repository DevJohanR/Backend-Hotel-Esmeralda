//! No testeado

// const { Sequelize } = require("sequelize");
// const {
//   car_reservations,
//   room_reservations,
//   spa_reservations,
//   connect,
// } = require("../../db");

// const { createCarReservation } = require("../cars/reservation_car");
// const { createReservation } = require("./createReservationsRoom");
// const { createSpaReservation } = require("../spa/spa_reservation");

// const createMultipleReservations = async (req, res) => {
//   const transaction = await connect.transaction();
//   try {
//     const { user_id, reservations } = req.body;

//     const results = [];

//     for (const reservation of reservations) {
//       let result;
//       switch (reservation.type) {
//         case "car":
//           result = await createCarReservation(
//             { body: reservation },
//             transaction
//           );
//           break;
//         case "room":
//           result = await createReservation({ body: reservation }, transaction);
//           break;
//         case "spa":
//           result = await createSpaReservation(
//             { body: reservation },
//             transaction
//           );
//           break;
//         default:
//           throw new Error(`Tipo de reserva no soportado: ${reservation.type}`);
//       }
//       results.push(result);
//     }

//     await transaction.commit();
//     return res.status(201).json(results);
//   } catch (error) {
//     await transaction.rollback();
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "Error al crear las reservaciones" });
//   }
// };

// module.exports = { createMultipleReservations };
