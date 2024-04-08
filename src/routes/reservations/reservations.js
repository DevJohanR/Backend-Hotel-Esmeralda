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
const { get } = require("http");
const {
  getUserReservations,
} = require("../../controllers/userReservations/getUserReservations");
const {
  createRestaurantReservation,
} = require("../../controllers/restaurant_reserv/create");
const {
  deleteRestaurantReservation,
} = require("../../controllers/restaurant_reserv/delete_reserv");
const {
  editRestaurantReservation,
} = require("../../controllers/restaurant_reserv/edit_reserv");

const router = Router();

router.post("/", createReservation);
router.post("/checkin", checkinReservations);
router.post("/checkout", checkOutReservations);
router.get("/userReservations/:userId", getUserReservations);
router.post("/restaurant", createRestaurantReservation);
router.delete("/delete_reserv/:id", deleteRestaurantReservation);
router.patch("/edit_reserv/:id", editRestaurantReservation);

module.exports = router;
