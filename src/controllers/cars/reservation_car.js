const { Sequelize } = require("sequelize");
const { car_reservations, connect } = require("../../db");
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

    // Creo la reservación de auto
    const newReservation = await car_reservations.create(
      {
        reservation_number: reservationNumber,
        user_id,
        check_in_date: new Date(checkInDateTime), // Asegúrate de que estos campos coincidan con los nombres de los campos en tu modelo
        check_out_date: new Date(checkOutDateTime), // Asegúrate de que estos campos coincidan con los nombres de los campos en tu modelo
        status: "pending",
        total_price: total_price, 
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
