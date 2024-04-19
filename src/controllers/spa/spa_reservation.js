const { spa_reservations, user_reservations, connect } = require("../../db");
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

const createSpaReservation = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const {
      user_id,
      checkInDateTime,
      checkOutDateTime,
      spa_room_id,
      total_price,
    } = req.body;

    const reservationNumber = generateReservationNumber();

    const newSpaReservation = await spa_reservations.create(
      {
        user_id,
        check_in_date: new Date(checkInDateTime),
        check_out_date: new Date(checkOutDateTime),
        spa_room_id,
        total_price,
        reservation_number: reservationNumber,
      },
      { transaction }
    );

    await user_reservations.create(
      {
        user_id,
        spa_reservation_id: newSpaReservation.id,
        total_price,
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json(newSpaReservation);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al crear la reservación del spa." });
  }
};

module.exports = { createSpaReservation };
