const { reservations, rooms } = require('../../db'); // Asegúrate de que este path sea correcto
const crypto = require('crypto');
const { Op } = require('sequelize');

// Función para generar un número de reserva aleatorio
const generateReservationNumber = () => {
 const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 let reservationNumber = '';
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
    const { user_id, check_in_date, check_out_date, check_in_time, check_out_time, room_id } = req.body;

    // Obtener el precio por noche de la habitación
    const room = await rooms.findByPk(room_id);
    if (!room) {
        return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    const pricePerNight = room.price_per_night; // Asegúrate de que 'price_per_night' es el nombre correcto del campo en tu modelo de habitación

    // Calcular el total_price basado en el precio por noche y la duración de la estancia
    const checkInDate = new Date(check_in_date);
    const checkOutDate = new Date(check_out_date);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = pricePerNight * nights;

    let reservationNumber = generateReservationNumber();

    const existingReservation = await reservations.findOne({
      where: {
        reservation_number: reservationNumber,
        status: {
          [Op.ne]: 'finalized' 
        }
      }
    });

    if (existingReservation) {
      reservationNumber = generateReservationNumber();
    }

    // Crea una nueva instancia de reserva
    const newReservation = await reservations.create({
      reservation_number: reservationNumber,
      user_id,
      check_in_date,
      check_out_date,
      check_in_time,
      check_out_time,
      status: 'pending',
      total_price: totalPrice,
      room_id,
    });

    res.status(201).json(newReservation);
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reserva' });
 }
};

module.exports = { createReservation };
