// controllers/reservationStatusController.js

const { user_reservations, room_reservations, spa_reservations, car_reservations, restaurant_reserv } = require('../../db'); 

/**
 * 
 * @param {UUID} userId 
 */
async function initializeReservationStatus(userId) {
  try {
    const reservations = await user_reservations.findOne({ where: { user_id: userId } });
    if (reservations) {
      reservations.room_reservation_status = false;
      reservations.spa_reservation_status = false;
      reservations.car_reservation_status = false;
      reservations.restaurant_reservation_status = false;
      reservations.total_price = 0;
      await reservations.save();
      console.log('Estados de reservación inicializados para el usuario:', userId);
    } else {
      console.log('No se encontraron reservaciones para el usuario:', userId);
    }
  } catch (error) {
    console.error('Error al inicializar los estados de las reservaciones:', error);
  }
}

/**
 * 
 * @param {UUID} userId 
 * @param {Object} paymentDetails - 
 */
async function updateReservationStatusOnPayment(userId, paymentDetails) {
  try {
    await initializeReservationStatus(userId); // If If If
    const reservations = await user_reservations.findOne({ where: { user_id: userId } });

    if (!reservations) {
      console.log('No se encontraron reservaciones para actualizar con el usuario:', userId);
      return;
    }

    if (paymentDetails.room_reservation_id) {
      reservations.room_reservation_status = true;
      const room = await room_reservations.findByPk(paymentDetails.room_reservation_id);
      reservations.total_price += room.total_price;
    }
    if (paymentDetails.spa_reservation_id) {
      reservations.spa_reservation_status = true;
      const spa = await spa_reservations.findByPk(paymentDetails.spa_reservation_id);
      reservations.total_price += spa.total_price;
    }
    if (paymentDetails.car_reservation_id) {
      reservations.car_reservation_status = true;
      const car = await car_reservations.findByPk(paymentDetails.car_reservation_id);
      reservations.total_price += car.total_price;
    }
    if (paymentDetails.restaurant_reservation_id) {
      reservations.restaurant_reservation_status = true;
      const restaurant = await restaurant_reserv.findByPk(paymentDetails.restaurant_reservation_id);
      reservations.total_price += restaurant.total_price;
    }

    await reservations.save();
    console.log('Reservaciones actualizadas con éxito para el usuario:', userId);
  } catch (error) {
    console.error('Error al actualizar las reservaciones:', error);
  }
}

module.exports = { updateReservationStatusOnPayment };
