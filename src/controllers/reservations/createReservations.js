const { reservations, rooms } = require("../../db"); // Asegúrate de que este path sea correcto
const crypto = require("crypto");
const { Op } = require("sequelize");

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
    const { user_id, check_in_date, check_out_date, room_id } = req.body;

    // Obtener el precio por noche de la habitación
    console.log(user_id, check_in_date, check_out_date, room_id);

    const room = await rooms.findByPk(room_id);
    if (!room) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
    const pricePerNight = room.price_per_night; // Asegúrate de que 'price_per_night' es el nombre correcto del campo en tu modelo de habitación

    // Calcular el total_price basado en el precio por noche y la duración de la estancia
    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = pricePerNight * nights;

    // Establecer la hora de check-in a las 3 PM y la hora de check-out a las 12 PM
    checkInDate.setHours(10, 0, 0, 0); // 3 PM
    checkOutDate.setHours(7, 0, 0, 0); // 12 PM

    // Verificar si el usuario ya tiene una reserva pendiente para las fechas solicitadas
    const existingReservation = await reservations.findOne({
      where: {
        user_id,
        status: "pending",
        [Op.or]: [
          {
            check_in_date: {
              [Op.lte]: checkOutDate,
              [Op.gte]: checkInDate,
            },
          },
          {
            check_out_date: {
              [Op.lte]: checkOutDate,
              [Op.gte]: checkInDate,
            },
          },
        ],
      },
    });

    if (existingReservation) {
      return res
        .status(400)
        .json({ message: "Ya tienes una reserva pendiente para esa fecha" });
    }

    let reservationNumber = generateReservationNumber();

    const existingReservationNumber = await reservations.findOne({
      where: {
        reservation_number: reservationNumber,
        status: {
          [Op.ne]: "finalized",
        },
      },
    });

    if (existingReservationNumber) {
      reservationNumber = generateReservationNumber();
    }

    // Crea una nueva instancia de reserva
    const newReservation = await reservations.create({
      reservation_number: reservationNumber,
      user_id,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      status: "pending",
      total_price: totalPrice,
      room_id,
    });

    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al crear la reserva", error });
  }
};

module.exports = { createReservation };
