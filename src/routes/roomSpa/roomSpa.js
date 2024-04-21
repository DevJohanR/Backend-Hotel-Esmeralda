const { Router } = require("express");
const { createOrUpdateRoomSpa } = require("../../controllers/spa/createRoomSpa");
const { allSpaServices } = require("../../controllers/spa/allSpaServices");
const { findAvailableSpa } = require("../../controllers/spa/findAvailableSpa");
const { createSpaReservation } = require("../../controllers/spa/createSpaReservation");

const router = Router();

router.post("/", createOrUpdateRoomSpa);
router.get("/", allSpaServices)
router.get("/available", findAvailableSpa);
router.post("/reservation", createSpaReservation);



module.exports = router;