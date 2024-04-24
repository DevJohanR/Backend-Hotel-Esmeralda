const { Sequelize } = require("sequelize");
const { restaurant_reserv, connect } = require("../../db");

const createRestaurantReservation = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { user_id, number_of_diners, reservation_day, reservation_hour } =
      req.body;

    const reservationTime = new Date(
      `${reservation_day}T${reservation_hour}:00`
    );

    if (reservationTime < new Date()) {
      return res.status(400).send("Reservation time cannot be in the past");
    }

    let tableNumber = null;
    for (let i = 1; i <= 100; i++) {
      const isTableNumberAvailable = await restaurant_reserv.findOne({
        where: { table_number: i },
        transaction,
      });

      if (!isTableNumberAvailable) {
        tableNumber = i;
        break;
      }
    }

    if (!tableNumber) {
      return res.status(400).send("No available table numbers");
    }

    const newReservation = await restaurant_reserv.create(
      {
        user_id,
        number_of_diners,
        table_number: tableNumber,
        reservation_time: reservationTime, // fecha y hora combinadas
      },
      { transaction }
    );

    console.log(newReservation);

    await transaction.commit();

    const reservation = await restaurant_reserv.findByPk(newReservation.id);
    if (!reservation) {
      return res.status(404).send("Reservation not found");
    }
    return res.status(200).send(reservation);
  } catch (error) {
    await transaction.rollback();
    console.log(error);

    return res.status(500).json(error);
  }
};

module.exports = { createRestaurantReservation };
