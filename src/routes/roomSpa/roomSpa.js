const { Router } = require("express");
const { createOrUpdateRoomSpa } = require("../../controllers/spa/createRoomSpa");
const { allSpaServices } = require("../../controllers/spa/allSpaServices");

const router = Router();

router.post("/", createOrUpdateRoomSpa);
router.get("/", allSpaServices)

module.exports = router;