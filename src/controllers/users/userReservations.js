const {
  reservations,
  rooms,
  car_reservations,
  user_reservations,
} = require("../../db");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const { connect } = require("../../db");

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

const createUserReservation = async (req, res) => {
  try {
    const {
      user_id,
      check_in_date,
      check_out_date,
      room_id,
      car_id,
      total_price,
    } = req.body;
    const transaction = await connect.transaction();

    let reservationNumber = generateReservationNumber();
    let reservationType = null;
    let reservationData = null;

    // Determinar si se trata de una reservación de habitación o de coche
    if (room_id) {
      reservationType = "room";
      reservationData = {
        check_in_date,
        check_out_date,
        room_id,
      };
    } else if (car_id) {
      reservationType = "car";
      reservationData = {
        checkInDateTime: check_in_date,
        checkOutDateTime: check_out_date,
        car_id,
        total_price,
      };
    } else {
      return res
        .status(400)
        .json({ message: "Tipo de reservación no especificado" });
    }

    let newReservation = null;
    let reservationId = null;
    if (reservationType === "room") {
      // Lógica para crear una reservación de habitación
      newReservation = await reservations.create(
        {
          reservation_number: reservationNumber,
          user_id,
          check_in_date: new Date(reservationData.check_in_date),
          check_out_date: new Date(reservationData.check_out_date),
          status: "pending",
          total_price: total_price,
          room_id: reservationData.room_id,
        },
        { transaction }
      );
      reservationId = newReservation.id;
    } else if (reservationType === "car") {
      // Lógica para crear una reservación de coche
      newReservation = await car_reservations.create(
        {
          reservation_number: reservationNumber,
          user_id,
          check_in_date: new Date(reservationData.checkInDateTime),
          check_out_date: new Date(reservationData.checkOutDateTime),
          status: "pending",
          total_price: reservationData.total_price,
          car_id: reservationData.car_id,
        },
        { transaction }
      );
      reservationId = newReservation.id;
    }

    // Crear una entrada en user_reservations
    const userReservation = await user_reservations.create(
      {
        user_id,
        room_reservation_id: reservationType === "room" ? reservationId : null,
        car_reservation_id: reservationType === "car" ? reservationId : null,
        total_price: total_price, // Asegúrate de que este valor sea correcto
        status: "pending", // Puedes ajustar el estado según sea necesario
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json(userReservation);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al crear la reservación", error });
  }
};

module.exports = { createUserReservation };
