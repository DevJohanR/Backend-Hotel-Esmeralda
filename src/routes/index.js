const { Router } = require("express");
const roomsControllers = require('../controllers/roomsControllers');

  const router = Router();
  
  router.get("/", (req, res) => {
    res.status(200).json("Bienvenido");
  });

 
  router.post('/rooms', roomsControllers.createRoom);
  router.get('/rooms', roomsControllers.listRooms);  
  router.get('/rooms/:id', roomsControllers.getRoomDetails);
  // router.put('/rooms/:id', roomsControllers.updateRoom);


module.exports = router;