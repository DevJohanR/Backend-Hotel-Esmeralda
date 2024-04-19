const { sendReservationConfirmationEmail } = require('../email/reservationEmailService');
const { reservations, users, room_details, spa_reservations, car_reservations } = require('../../db');

exports.sendConfirmationEmail = async (req, res) => {
    const reservationId = req.params.id;

    try {
        const reservation = await reservations.findByPk(reservationId, {
            include: [
                { model: users },
                {
                    model: room_details,//reservation
                    as: 'roomDetails'  // Asegúrate que las relaciones están correctamente definidas en tu modelo
                },
                {
                    model: spa_reservations,
                    as: 'spaDetails'
                },
                {
                    model: car_reservations,
                    as: 'carDetails'
                }
            ]
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        const { user, roomDetails, spaDetails, carDetails } = reservation;

        const roomFeatures = `Habitación: ${roomDetails.room_id} features: ${roomDetails.single_bed} single beds, ${roomDetails.double_bed} double beds, Air Conditioning: ${roomDetails.air_conditioning ? 'Yes' : 'No'}`;
        const spaDescription = spaDetails ? `Spa Booking: ${spaDetails.description} on ${spaDetails.checkInDateTime}` : 'No spa booking';
        const carDescription = carDetails ? `Car Rental: ${carDetails.car_id} from ${carDetails.checkInDateTime} to ${carDetails.checkOutDateTime}` : 'No car rental';

        const reservationDetails = `${roomFeatures}, ${spaDescription}, ${carDescription}`;

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
