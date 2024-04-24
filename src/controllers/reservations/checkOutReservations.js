const { user_reservations, rooms } = require('../../db');

const checkOutReservations = async (req, res, next) => {
 try {
    const { reservation_number } = req.body;

    // Buscar la reserva por número de reserva
    const reservation = await user_reservations.findOne({
      where: {
        reservation_number: reservation_number,
        status: 'confirmed' // Solo buscar reservas confirmadas
      }
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada o ya finalizada' });
    }

    // Marcar la hora de salida y cambiar el estado de la reserva a "finalized"
    const checkOutTime = new Date(); 
    await reservation.update({
      check_out_time: checkOutTime,
      status: 'finalized'
    });

    // Obtener el ID de la habitación de la reserva
    const roomId = reservation.room_id;

    // Buscar la habitación por ID
    const room = await rooms.findByPk(roomId);

    if (room && room.status === 'maintenance') {
      setTimeout(async () => {
          await room.update({
              status: 'available'
          });
      }, 7000); 
  }

    res.status(200).json({ message: 'Check-out realizado y reserva finalizada', reservation });
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al realizar el check-out' });
 }
};

module.exports = { checkOutReservations };
