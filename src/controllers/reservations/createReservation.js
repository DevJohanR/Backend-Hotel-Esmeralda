const { Op, Sequelize } = require('sequelize');
const { reservations, rooms, spa_reservations, car_reservations } = require('../../db');
const crypto = require('crypto');

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
  const t = await sequelize.transaction();
  try {
    const { user_id, check_in_date, check_out_date, room_id, car_check_in_date, car_check_out_date, car_total_price, car_id, spa_check_in_date, spa_check_out_date, spa_total_price } = req.query;

 
    const existingRoomReservation = await reservations.findOne({
      where: {
        user_id,
        status: 'pending',
        [Op.or]: [
          {
            check_in_date: {
              [Op.lte]: new Date(check_out_date),
              [Op.gte]: new Date(check_in_date)
            }
          },
          {
            check_out_date: {
              [Op.lte]: new Date(check_out_date),
              [Op.gte]: new Date(check_in_date)
            }
          }
        ]
      },
      transaction: t
    });

    if (existingRoomReservation) {
      await t.rollback();
      return res.status(400).json({ message: 'Ya tienes una reserva de habitación pendiente para esas fechas' });
    }

    // Verificar si el usuario desea reservar un spa para las fechas especificadas
    if (spa_check_in_date && spa_check_out_date) {
      const existingSpaReservation = await spa_reservations.findOne({
        where: {
          user_id,
          status: 'active',
          checkInDateTime: {
            [Op.lt]: new Date(spa_check_out_date)
          },
          checkOutDateTime: {
            [Op.gt]: new Date(spa_check_in_date)
          }
        },
        transaction: t
      });

      if (existingSpaReservation) {
        await t.rollback();
        return res.status(400).json({ message: 'Ya tienes una reserva de spa activa para esas fechas' });
      }
    }

    // Verificar si el usuario desea reservar un coche para las fechas especificadas
    if (car_check_in_date && car_check_out_date) {
      const existingCarReservation = await car_reservations.findOne({
        where: {
          user_id,
          status: 'confirmed',
          checkInDateTime: {
            [Op.lt]: new Date(car_check_out_date)
          },
          checkOutDateTime: {
            [Op.gt]: new Date(car_check_in_date)
          }
        },
        transaction: t
      });

      if (existingCarReservation) {
        await t.rollback();
        return res.status(400).json({ message: 'Ya tienes una reserva de coche activa para esas fechas' });
      }
    }

   
    const reservationNumber = generateReservationNumber();
    const newRoomReservation = await reservations.create({
      reservation_number: reservationNumber,
      user_id,
      check_in_date: new Date(check_in_date),
      check_out_date: new Date(check_out_date),
      status: 'pending',
      room_id,
    }, { transaction: t });

  
    await t.commit();

    // Array con los precios de los servicios
    const prices = [];

    // Precio de la habitación
    const roomPrice = 200;
    prices.push({ service: 'Habitación', price: roomPrice });

    // Precio del spa si se ha reservado
    if (spa_check_in_date && spa_check_out_date) {
      prices.push({ service: 'Spa', price: spa_total_price });
    }

    // Precio del coche si se ha reservado
    if (car_check_in_date && car_check_out_date) {
      prices.push({ service: 'Coche', price: car_total_price });
    }

    // Devolver respuesta con éxito y detalles de la reserva
    return res.status(201).json({ 
      message: 'Reserva de habitación creada exitosamente', 
      reservation: newRoomReservation,
      prices: prices
    });

  } catch (error) {
    // En caso de error, hacer rollback de la transacción y devolver un mensaje de error
    console.error(error);
    await t.rollback();
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
};

module.exports = { createReservation };
