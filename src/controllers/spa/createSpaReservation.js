const { Sequelize } = require("sequelize");
const { spa_reservations, user_reservations, connect, room_spa } = require("../../db");
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
    const { user_id, check_in_date, check_out_date, spa_room_id } = req.body;

    // Buscar la habitación de spa por su ID
    const spaRoom = await room_spa.findByPk(spa_room_id);
    
    if (!spaRoom) {
      return res.status(404).json({ message: "Spa room not found" });
    }

    // Obtener el precio de la habitación de spa
    const total_price = spaRoom.price;

    // Validar si ya existe un usuario con ese ID
    let userReservation = await user_reservations.findOne({
      where: {
        user_id: user_id,
      },
    });

    // Si no existe una reserva para ese usuario, crear una nueva instancia de usuario
    if (!userReservation) {
      userReservation = await user_reservations.create(
        {
          user_id: user_id,
          status: "pending",
        },
        { transaction }
      );
    }

    // Generar número de reserva único
    let reservationNumber = generateReservationNumber();
    const existingReservationNumber = await spa_reservations.findOne({
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

    // Crear la reservación de spa con el precio obtenido
    const newSpaReservation = await spa_reservations.create(
      {
        reservation_number: reservationNumber,
        user_id,
        check_in_date: new Date(check_in_date),
        check_out_date: new Date(check_out_date),
        status: "pending",
        total_price: total_price,
        spa_room_id: spa_room_id,
      },
      { transaction }
    );

    // Sumar el total_price de la nueva reserva al total_price asociado con la reserva del usuario
    const updatedTotalPrice =
      parseFloat(userReservation.total_price) + parseFloat(total_price);

    // Asociar la reserva de spa al usuario existente y actualizar el total_price
    await userReservation.update(
      {
        spa_reservation_id: newSpaReservation.id,
        total_price: updatedTotalPrice,
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json(newSpaReservation);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: "Error al crear la reservación de spa" });
  }
};

module.exports = { createSpaReservation };
