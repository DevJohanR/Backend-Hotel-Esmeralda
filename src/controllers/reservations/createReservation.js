const { createRoomReservation } = require('../controllers/roomReservationFunctions');
const { createCarReservation } = require('../controllers/carReservationFunctions');
const { createSpaReservation } = require('../controllers/spaReservationFunctions');

const makeReservation = async (req, res) => {
  try {
    const { service, ...reservationDetails } = req.body;

    
    let canMakeReservation = false;
    if (service === 'room') {
     
      canMakeReservation = await checkRoomReservation(reservationDetails);
    } else if (service === 'car') {
     
      canMakeReservation = await checkCarReservation(reservationDetails);
    } else if (service === 'spa') {
     
      canMakeReservation = await checkSpaReservation(reservationDetails);
    }

    if (!canMakeReservation) {
      return res.status(400).json({ message: 'No se puede hacer la reserva' });
    }

   
    let newReservation;
    if (service === 'room') {
      newReservation = await createRoomReservation(reservationDetails);
    } else if (service === 'car') {
      newReservation = await createCarReservation(reservationDetails);
    } else if (service === 'spa') {
      newReservation = await createSpaReservation(reservationDetails);
    }

    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al hacer la reserva' });
  }
};


const checkRoomReservation = async ({ user_id, check_in_date, check_out_date }) => {

};


const checkCarReservation = async ({ user_id, checkInDateTime, checkOutDateTime }) => {
  // Lógica para verificar si la reserva de coche puede ser hecha
  // Retorna true si se puede hacer la reserva, false de lo contrario
};

// Función para verificar la reserva de spa
const checkSpaReservation = async ({ user_id, checkInDateTime, checkOutDateTime }) => {
  // Lógica para verificar si la reserva de spa puede ser hecha
  // Retorna true si se puede hacer la reserva, false de lo contrario
};

module.exports = { makeReservation };
