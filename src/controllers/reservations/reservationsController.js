const { reservations } = require("../db"); // Importa el modelo de reservaciones

// Controlador para crear una nueva reservación
exports.createReservation = async (req, res) => {
  try {
    const {
      reservation_number,
      check_in_date,
      check_out_date,
      status,
      total_price,
      room_id,
    } = req.body;

    // Generar un user_id ficticio
    const fakeUserId = "12345678-1234-5678-9012-123456789abc";

    // Crear la reserva en la base de datos
    const reservation = await reservations.create({
      reservation_number,
      user_id: fakeUserId,
      check_in_date,

      check_out_date,
      status,
      total_price,
      room_id,
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error al crear la reservación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para obtener todas las reservaciones de un usuario
exports.getUserReservations = async (req, res) => {
  try {
    // Aquí va la lógica para obtener las reservaciones de un usuario
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para actualizar el estado de una reservación
exports.updateReservationStatus = async (req, res) => {
  try {
    // Aquí va la lógica para actualizar el estado de una reservación
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
