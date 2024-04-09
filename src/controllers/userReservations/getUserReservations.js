const { user_reservations, reservations, spa_reservations } = require('../../db');

// Controlador para obtener todas las reservas de un usuario con su estado
const getUserReservations = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Buscar todas las reservas del usuario en la tabla user_reservations
        const userReservations = await user_reservations.findAll({
            where: { user_id: userId }, // Asegúrate de que userId sea una cadena de texto
            include: [
                { model: reservations }, 
                { model: spa_reservations }
            ]
        });
        

        // Verificar si el usuario tiene reservas
        if (userReservations.length === 0) {
            // Si el usuario no tiene reservas, devolver un mensaje
            return res.status(200).json({ message: "El usuario no tiene reservas." });
        }

        // Mapear las reservas para incluir el estado de cada reserva
        const formattedReservations = userReservations.map(userReservation => {
            // Obtener el estado de la reserva de habitación (si existe)
            const roomReservationStatus = userReservation.reservation ? userReservation.reservation.status : null;

            // Obtener el estado de la reserva de spa (si existe)
            const spaReservationStatus = userReservation.spa_reservation ? userReservation.spa_reservation.status : null;

            return {
                user_reservation_id: userReservation.id,
                room_reservation_status: roomReservationStatus,
                spa_reservation_status: spaReservationStatus
            };
        });

        res.status(200).json(formattedReservations);
    } catch (error) {
        console.error("Error al obtener las reservas del usuario:", error);
        res.status(500).json({ message: "Error al obtener las reservas del usuario" });
    }
};

module.exports = { getUserReservations };
