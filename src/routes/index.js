const { Router } = require("express");
const roomsController = require('../controllers/roomsController');

const routeInit = () => {
  const router = Router();

  
  router.get("/", (req, res) => {
    res.status(200).json("Bienvenido");
  });

 
  router.post('/rooms', roomsController.createRoom);
  router.get('/rooms', roomsController.listRooms);  
  router.get('/rooms/:id', roomsController.getRoomDetails);

  return router;
};

module.exports = routeInit;