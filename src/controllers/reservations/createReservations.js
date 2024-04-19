const {
  reservations,
  rooms,
  users,
  spa_reservations,
  car_reservations,
} = require("../../db"); // Asegúrate de que este path sea correcto

const crypto = require("crypto");
const { Op, where } = require("sequelize");

// Función para generar un número de reserva aleatorio
const generateReservationNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let reservationNumber = "";
  for (let i = 0; i < 3; i++) {
    reservationNumber += letters.charAt(crypto.randomInt(letters.length));
  }
  for (let i = 0; i < 3; i++) {
    reservationNumber += crypto.randomInt(10);
  }
  return reservationNumber;
};

const createReservation = async (req, res, next) => {
  try {
    const { car_details: [car] } = req.body


    // const { car_id, price_per_day, total_days } = car;

    const {
       user_id,
      spa_id,
      car_id,
      room_id,
      check_in_date,
      check_out_date,
      total_price,
    } = req.body;

    const user = await users.findByPk(user_id);
    const reservation = await reservations.findOne({ where: { user_id } });
    const carsReservationsPrevs = await car_reservations.findOne({
      where: { user_id },
    });
    const spaReservationsPrevs = await spa_reservations.findOne({
      where: { user_id },
    });
    const reservationNumber = generateReservationNumber();
    if (!reservation) {
      const checkInDateRoom = new Date(check_in_date);
      const checkOutDateRoom = new Date(check_out_date);

      const createReservationRoom = await reservations.create({
        check_in_date: checkInDateRoom,
        check_out_date: checkOutDateRoom,
        check_in_time: 15000,
        check_out_time: 10000,
        room_id,
        user_id,
        reservation_number: reservationNumber,
        total_price,
      });

      let spa_res = {};
      let car_res = {};

      if (!spaReservationsPrevs) {
        if (spa_id) {
          // Si quiere reservar un spa
          const createSpaReservation = await spa_reservations.create({
            reservation_number: reservationNumber,
            user_id,
            spa_id,
            checkInDateTime: checkInDateRoom,
            checkOutDateTime: checkOutDateRoom,
            total_price,
          });
          spa_res = createSpaReservation;
        }
      }
      if (!carsReservationsPrevs) {
        if (car_id) {
          // const totalCarprice = price_per_day * total_days
          // Si quiere reservar un auto
          const createCarReservation = await car_reservations.create({
            reservation_number: reservationNumber,
            user_id,
            car_id,
            check_in_date: checkInDateRoom,
            check_out_date: checkOutDateRoom,
            total_price,
          });
          car_res = createCarReservation;
        }
      }

      res
        .status(200)
        .json({ spa: spa_res, room: createReservationRoom, car: car_res });
    } else {
      //** Acá caera cuando el usuario ya tiene una reserva de habitacion */

      const createdReservationNumberForUser = await reservations.findByPk(user_id, { attributes: reservation_number },)
      const datareservation = createdReservationNumberForUser

      console.log(datareservation)

      let spa_res = {};
      let car_res = {};

      if (!spaReservationsPrevs) {
        if (spa_id) {
          // Si quiere reservar un spa
          const createSpaReservation = await spa_reservations.create({
            reservation_number: datareservation,
            user_id,
            spa_id,
            checkInDateTime: check_in_date,
            checkOutDateTime: check_out_date,
            total_price,
          });
          spa_res = createSpaReservation;
        }
      }
      if (!carsReservationsPrevs) {
        if (car_id) {
          // Si quiere reservar un auto
          const createCarReservation = await car_reservations.create({
            reservation_number: datareservation,
            user_id,
            car_id,
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            total_price,
          });
          car_res = createCarReservation;
        }
      }

      res.status(200).json({ spa: spa_res, room: reservations, car: car_res });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createReservation };
