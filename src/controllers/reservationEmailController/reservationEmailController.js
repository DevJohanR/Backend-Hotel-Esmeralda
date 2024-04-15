// controllers/reservationEmailController.js
const { sendReservationConfirmationEmail } = require('../email/reservationEmailService');
const { reservations, users } = require('../../db'); 
exports.sendConfirmationEmail = async (req, res) => {
  const reservationId = req.params.id; 

  try {
    const reservation = await reservations.findByPk(reservationId, {
      include: [{ model: users }]
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

  
    const { user, room_id, spaReservation_Id, carReservation_Id } = reservation;
    const reservationDetails = `Habitación: ${room_id}, SPA: ${spaReservation_Id}, Carro: ${carReservation_Id}`;

  
    await sendReservationConfirmationEmail({
      username: user.name,
      email: user.email,
      reservationDetails: reservationDetails
    });

    res.json({ message: 'Correo electrónico de confirmación enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico de confirmación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
