const { checkinReservations } = require("../../controllers/reservations/checkInReservations");
const { createReservation } = require("../../controllers/reservations/createReservations");
const { checkOutReservations } = require("../../controllers/reservations/checkOutReservations");

const { Router } = require("express");
const { authenticateToken } = require("../../helpers/authenticateToken");


const router = Router();

router.post("/",authenticateToken, createReservation);
router.post("/checkin", checkinReservations);
router.post("/checkout", checkOutReservations);

module.exports = router;