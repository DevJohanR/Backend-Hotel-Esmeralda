const { Router } = require("express");
const roomsController = require("../controllers/roomsController");
const reservationsController = require("../controllers/reservationsController");
const roomTypesController = require("../controllers/roomTypesController");
const dishesRoutes = require("./dishes");
const path = require("path");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json("Bienvenido");
});

router.post("/rooms", roomsController.createRoom);
router.get("/rooms", roomsController.listRooms);
router.get("/rooms/:id", roomsController.getRoomDetails);
router.delete("/rooms/:id", roomsController.deleteRoom);

router.post("/roomTypes", roomTypesController.createRoomType);
router.get("/roomTypes", roomTypesController.listRoomTypes);
router.put("/roomTypes/:id", roomTypesController.updateRoomTypeById);
router.delete("/roomTypes/:id", roomTypesController.deleteRoomTypeById);

router.put("/rooms/:id", roomsController.updateRoom);

router.use("/api", dishesRoutes);

// Reservas

// router.post('/reservations', reservationsController.createReservation);

module.exports = router;

//hi
