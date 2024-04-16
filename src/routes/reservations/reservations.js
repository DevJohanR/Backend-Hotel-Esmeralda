const {
  checkinReservations,
} = require("../../controllers/reservations/checkInReservations");
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
const { createRoomReservation } = require("../../controllers/reservations/createRoomReservations");

const { createReservation } = require("../../controllers/reservations/createReservation");

const router = Router();

router.post("/", createRoomReservation);
router.get("/", getReservations);
router.get("/:id", getReservations);
router.post("/checkin", checkinReservations);
router.post("/checkout", checkOutReservations);
router.get("/userReservations/:userId", getUserReservations);
router.post("/restaurant", createRestaurantReservation);
router.patch("/cancel_reserv/:id", cancelRestaurantReservation);
router.patch("/edit_reserv/:id", editRestaurantReservation);
router.post("/createreservations", createReservation)

module.exports = router;
