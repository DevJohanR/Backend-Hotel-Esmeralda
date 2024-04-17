const { createRoomReservation } = require('../reservations/createRoomReservations');
const { createCarReservation } = require('../cars/reservation_car');
const { createSpaReservation } = require('../spa/CreateReservaition');
const crypto = require('crypto');

const generateReservationNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let reservationNumber = "";
  for (let i = 0; i < 3; i++) {
    reservationNumber += letters.charAt(crypto.randomInt(letters.length));
  }
  for (let i = 0; i < 3; i++) {
    reservationNumber += crypto.randomInt(10);
  }
  return reservationNumber;
};

const createReservation = async (req, res, next) => {
  const reservationNumber = generateReservationNumber();
  try {
    const { roomAvailability, carAvailability, spaAvailability } = req.body;


    if (!roomAvailability || !carAvailability || !spaAvailability) {
      return res.status(400).json({ message: 'One or more services are not available at the requested time.' });
    }

    // Creating reservations for available services
    if (roomAvailability) {
      await createRoomReservation({ ...req, body: { ...req.body, reservationNumber } }, res);
    }
    if (carAvailability) {
      await createCarReservation({ ...req, body: { ...req.body, reservationNumber } }, res);
    }
    if (spaAvailability) {
      await createSpaReservation({ ...req, body: { ...req.body, reservationNumber } }, res);
    }

    // Sending success response after all reservations
    res.status(200).json({ message: 'All reservations created successfully', reservationNumber });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation' });
  }
};

module.exports = { createReservation };
