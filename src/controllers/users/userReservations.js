// const { connect } = require('../../db');
// const { createCarReservation } = require('../cars/createCarReservation');
// const { createReservation } = require('../reservations/createReservations');

// const ERROR_NO_DATA_ROOM = "Datos de reserva de habitación no proporcionados";
// const ERROR_NO_DATA_CAR = "Datos de reserva de coche no proporcionados";
// const ERROR_NO_RESERVATION_CREATED = "No se creó ninguna reserva";

// async function createRoomReservation(data, transaction) {
//   if (!data) throw new Error(ERROR_NO_DATA_ROOM);
//   return createReservation(data, { transaction });
// }

// async function createVehicleReservation(data, transaction) {
//   if (!data) throw new Error(ERROR_NO_DATA_CAR);
//   return createCarReservation(data, { transaction });
// }

// const createUserReservation = async (req, res) => {
//   const { user_id, room_reservation_data, car_reservation_data } = req.body;
//   const t = await connect.transaction();

//   try {
//     let total_price = 0;
//     let roomReservationId = null;
//     let carReservationId = null;

//     if (room_reservation_data) {
//       const roomReservation = await createRoomReservation(room_reservation_data, t);
//       total_price += roomReservation.total_price;
//       roomReservationId = roomReservation.id;
//     }

//     if (car_reservation_data) {
//       const carReservation = await createVehicleReservation(car_reservation_data, t);
//       total_price += carReservation.total_price;
//       carReservationId = carReservation.id;
//     }

//     if (!roomReservationId && !carReservationId) {
//       throw new Error(ERROR_NO_RESERVATION_CREATED);
//     }

//     const userReservation = await connect.models.user_reservations.create({
//       user_id,
//       room_reservation_id: roomReservationId,
//       car_reservation_id: carReservationId,
//       total_price,
//     }, { transaction: t });

//     await t.commit();
//     res.status(201).json(userReservation);
//   } catch (error) {
//     await t.rollback();
//     console.error('Error al crear la reserva de usuario:', error);
//     res.status(400).json({ message: 'Error al crear la reserva de usuario', error: error.message });
//   }
// };

// module.exports = { createUserReservation };
