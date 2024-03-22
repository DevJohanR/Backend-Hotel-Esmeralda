const { Router } = require("express");
const { createRoom } = require("../../controllers/rooms/createRoom");
const { listRooms } = require("../../controllers/rooms/listRooms");
const { updateRoom } = require("../../controllers/rooms/updateRoom");
const { getRoomDetails } = require("../../controllers/rooms/getRoomDetails");
const { deleteRoom } = require("../../controllers/rooms/deleteRoom");
const { findAvailableRoom } = require("../../controllers/rooms/findAvailableRoom");

const router = Router();



router.post("/", createRoom);
router.get("/", listRooms);
router.patch("/:id", updateRoom);
router.get("/:id", getRoomDetails);
router.delete("/:id", deleteRoom);
router.post('/available', findAvailableRoom);


module.exports = router;