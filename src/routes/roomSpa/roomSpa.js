const { Router } = require("express");
const {
  createOrUpdateRoomSpa,
} = require("../../controllers/spa/createRoomSpa");
const { allSpaServices } = require("../../controllers/spa/allSpaServices");
const {
  createSpaReservation,
} = require("../../controllers/spa/spa_reservation");

const router = Router();

router.post("/", createOrUpdateRoomSpa);
router.get("/", allSpaServices);
router.post("/reservation", createSpaReservation);

module.exports = router;
