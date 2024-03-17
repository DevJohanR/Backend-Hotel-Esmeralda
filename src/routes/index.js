const { Router } = require("express");
const roomsController = require('../controllers/roomsController');
const reservationsController = require('../controllers/reservationsController');

  const router = Router();
  
  router.get("/", (req, res) => {
    res.status(200).json("Bienvenido");
  });

 
  router.post('/rooms', roomsController.createRoom);
  router.get('/list', roomsController.listRooms);  
  router.get('/rooms/:id', roomsController.getRoomDetails);
  router.delete('/rooms/:id', roomsController.deleteRoom);

  router.put('/rooms/:id', roomsController.updateRoom);

  // router.post('/reservations', reservationsController.createReservation);

module.exports = router;