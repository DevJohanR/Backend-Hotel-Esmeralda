const { Sequelize } = require("sequelize");
const { car_reservations, user_reservations, connect } = require("../../db");
const crypto = require("crypto");

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

const createCarReservation = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { user_id, checkInDateTime, checkOutDateTime, car_id, total_price } = req.body;

    // Validar si ya existe un usuario con ese ID
    let userReservation = await user_reservations.findOne({
      where: {
        user_id: user_id,
      },
    });

    // Si no existe una reserva para ese usuario, crear una nueva instancia de usuario
    if (!userReservation) {
      userReservation = await user_reservations.create({
        user_id: user_id,
        status: "pending",
      }, { transaction });
    }

    // Generar número de reserva único
    let reservationNumber = generateReservationNumber();
    const existingReservationNumber = await car_reservations.findOne({
      where: {
        reservation_number: reservationNumber,
        status: {
          [Sequelize.Op.ne]: "pending",
        },
      },
    });

    if (existingReservationNumber) {
      reservationNumber = generateReservationNumber();
    }

    // Crear la reservación de auto
    const newCarReservation = await car_reservations.create(
      {
        reservation_number: reservationNumber,
        user_id,
        check_in_date: new Date(checkInDateTime),
        check_out_date: new Date(checkOutDateTime),
        status: "pending",
        total_price: total_price, 
        car_id,
      },
      { transaction }
    );

    // Sumar el total_price de la nueva reserva al total_price asociado con la reserva del usuario
    const updatedTotalPrice = parseFloat(userReservation.total_price) + parseFloat(total_price);

    // Asociar la reserva de auto al usuario existente y actualizar el total_price
    await userReservation.update({
      car_reservation_id: newCarReservation.id,
      total_price: updatedTotalPrice,
    }, { transaction });

    await transaction.commit();
    return res.status(201).json(newCarReservation);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: "Error al crear la reservación de auto" });
  }
};

module.exports = { createCarReservation };