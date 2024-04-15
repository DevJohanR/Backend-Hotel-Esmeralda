const { Sequelize } = require("sequelize");
const { car_details, car_reservations, connect } = require("../../db");
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
    const { user_id, checkInDateTime, checkOutDateTime, car_id } = req.body;

    // Obtengo los detalles del auto
    const car = await car_details.findByPk(car_id);
    if (!car) {
      return res.status(404).json({ message: "Auto no encontrado" });
    }

    //  precio total basado en el precio por día del auto y la duración de la reservación
    //
    const pricePerDay = car.price_per_day;
    const checkInDate = new Date(checkInDateTime);
    const checkOutDate = new Date(checkOutDateTime);
    const days = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = pricePerDay * days;

    let reservationNumber = generateReservationNumber();
    const existingReservationNumber = await car_reservations.findOne({
      where: {
        reservation_number: reservationNumber,
        status: {
          [Sequelize.Op.ne]: "completed",
        },
      },
    });

    if (existingReservationNumber) {
      reservationNumber = generateReservationNumber();
    }

    // Creo la reservación de auto
    const newReservation = await car_reservations.create(
      {
        reservation_number: reservationNumber,
        user_id,
        checkInDateTime: checkInDate,
        checkOutDateTime: checkOutDate,
        status: "active",
        total_price: totalPrice,
        car_id,
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json(newReservation);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al crear la reservación de auto" });
  }
};

module.exports = { createCarReservation };
