const { Router } = require("express");
const dishesRoutes = require("./dishes/dishes");
const roomsRoutes = require("./rooms/rooms");
const roomsTypesRoutes = require("./rooms/roomsTypes");
const authRoutes = require("./users/users");

const router = Router();

<<<<<<< HEAD
 
  router.post('/rooms', roomsController.createRoom);
  router.get('/list', roomsController.listRooms);  
  router.get('/rooms/:id', roomsController.getRoomDetails);
  router.put('/rooms/:id', roomsController.updateRoom);
  router.delete('/rooms/:id', roomsController.deleteRoom);
  router.get('/filter', roomsController.filterRooms);
=======
router.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenido" });
});

router.use("/api/dishes", dishesRoutes);
router.use("/api/rooms", roomsRoutes);
router.use("/api/roomstypes", roomsTypesRoutes);
router.use("/auth", authRoutes);
>>>>>>> fef2cfc97bb8439f7d73cba41b423f74bab6b376

module.exports = router;
