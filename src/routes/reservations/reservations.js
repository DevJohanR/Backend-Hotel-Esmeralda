const { checkinReservations } = require("../../controllers/reservations/checkInReservations");
const { createReservation } = require("../../controllers/reservations/createReservations");
const { checkOutReservations } = require("../../controllers/reservations/checkOutReservations");

const { Router } = require("express");


const router = Router();

router.post("/", createReservation);
router.post("/checkin", checkinReservations);
router.post("/checkout", checkOutReservations);

module.exports = router;