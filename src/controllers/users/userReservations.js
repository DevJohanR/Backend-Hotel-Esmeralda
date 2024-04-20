const { connect } = require('../../db'); // Usamos solo la instancia correcta de Sequelize

// Importaciones de funciones para reservaciones
const { createCarReservation } = require('../cars/reservation_car');
const { createReservation } = require('../reservations/createReservations');

// Función para crear reservación de habitación
async function createRoomReservation(data, transaction) {
  if (!data) throw new Error("Datos de reserva de habitación no proporcionados");
  return createReservation(data, { transaction });
}

// Función para crear reservación de vehículo
async function createVehicleReservation(data, transaction) {
  if (!data) throw new Error("Datos de reserva de coche no proporcionados");
  return createCarReservation(data, { transaction });
}

// Función principal para crear la reserva de usuario
const createUserReservation = async (req, res) => {
  const { user_id, room_reservation_data, car_reservation_data } = req.body;
  
  // Iniciar transacción
  const t = await connect.transaction();
  
  try {
    let total_price = 0;
    let roomReservationId = null;
    let carReservationId = null;

    // Crear reserva de habitación si se proporcionan los datos
    if (room_reservation_data) {
      const roomReservation = await createRoomReservation(room_reservation_data, t);
      total_price += roomReservation.total_price;
      roomReservationId = roomReservation.id;
    }

    // Crear reserva de coche si se proporcionan los datos
    if (car_reservation_data) {
      const carReservation = await createVehicleReservation(car_reservation_data, t);
      total_price += carReservation.total_price;
      carReservationId = carReservation.id;
    }

    // Verificar que al menos se haya creado una reserva
    if (!roomReservationId && !carReservationId) {
      await t.rollback();
      return res.status(400).json({ message: "No se creó ninguna reserva" });
    }

    // Crear reserva de usuario con transacción
    const userReservation = await connect.models.user_reservations.create({
      user_id,
      room_reservation_id: roomReservationId,
      car_reservation_id: carReservationId,
      total_price,
    }, { transaction: t });

    await t.commit();
    res.status(201).json(userReservation);
  } catch (error) {
    await t.rollback();
    console.error('Error al crear la reserva de usuario:', error);
      res.status(400).json({ message: 'Error al crear la reserva de usuario', error });
  }
};

module.exports = { createUserReservation };
