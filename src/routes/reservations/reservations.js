const {
  checkinReservations,
} = require("../../controllers/reservations/checkInReservations");
const {
  createReservation,
} = require("../../controllers/reservations/createReservations");
const {
  checkOutReservations,
} = require("../../controllers/reservations/checkOutReservations");
const { Router } = require("express");
const { authenticateToken } = require("../../helpers/authenticateToken");
const {
  getUserReservations,
} = require("../../controllers/userReservations/getUserReservations");
const {
  createRestaurantReservation,
} = require("../../controllers/restaurant_reserv/create");
const {
  cancelRestaurantReservation,
} = require("../../controllers/restaurant_reserv/cancel_reserv");
const {
  editRestaurantReservation,
} = require("../../controllers/restaurant_reserv/edit_reserv");
const {
  getReservations,
} = require("../../controllers/reservations/getReservations");
const {
  deleteReservation,
} = require("../../controllers/reservations/deleteReservation");
const {
  createAllReservations,
} = require("../../controllers/userReservations/createAllReservations");
const {
  getAllReservations,
} = require("../../controllers/userReservations/getAllreservations");
const {
  createRoomReservation,
} = require("../../controllers/userReservations/createRoomReservation");
const {
  cancelRoomReservation,
} = require("../../controllers/userReservations/cancelRoomReservation");
const {
  editRoomReservation,
} = require("../../controllers/userReservations/editRoomReservation");

const router = Router();

router.post("/", authenticateToken, createReservation);
router.post("/createAllReservations", createAllReservations);
router.get("/AllReservations", getAllReservations);
router.get("/", getReservations);
router.get("/:id", getReservations);
router.delete("/:id", authenticateToken, deleteReservation);
router.post("/checkin", checkinReservations);
router.post("/checkout", checkOutReservations);
router.get("/userReservations/:userId", getUserReservations);
router.post("/restaurant", createRestaurantReservation);
router.patch("/cancel_reserv/:id", cancelRestaurantReservation);
router.patch("/edit_reserv/:id", editRestaurantReservation);

router.post("/roomResevation", createRoomReservation);
router.patch("/editRoomReservation", editRoomReservation);
router.patch("/deleteRoomReservation", cancelRoomReservation);

module.exports = router;
