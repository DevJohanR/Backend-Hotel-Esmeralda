const { Sequelize } = require("sequelize");
const { car_reservations, user_reservations, connect } = require("../../db");
const crypto = require("crypto");

const generateReservationNumber = async () => {
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
    const { user_id, checkInDateTime, checkOutDateTime, car_id, total_price } =
      req.body;

    let reservationNumber = await generateReservationNumber();
    const existingReservationNumber = await car_reservations.findOne({
      where: {
        reservation_number: reservationNumber,
        status: {
          [Sequelize.Op.ne]: "pending",
        },
      },
    });

    if (existingReservationNumber) {
      reservationNumber = await generateReservationNumber();
    }

    const newReservation = await car_reservations.create(
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

    await user_reservations.create(
      {
        user_id,
        car_reservation_id: newReservation.id,
        total_price: total_price,
        status: "pending",
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
