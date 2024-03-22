const { reservations } = require('../../db'); 


const checkinReservations = async (req, res, next) => {
 try {
    const { reservation_number } = req.body;

    // Buscar la reserva por número de reserva
    const reservation = await reservations.findOne({
      where: {
        reservation_number: reservation_number,
        status: 'pending' 
      }
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada o ya confirmada' });
    }

   
    const checkInTime = new Date(); 
    await reservation.update({
      check_in_time: checkInTime,
      status: 'confirmed'
    });

    res.status(200).json({ message: 'Check-in realizado y reserva confirmada', reservation });
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al realizar el check-in' });
 }
};

module.exports = { checkinReservations };
