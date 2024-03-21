const { Router } = require("express");
const { createRoom } = require("../../controllers/rooms/createRoom");
const { listRooms } = require("../../controllers/rooms/listRooms");
const { updateRoom } = require("../../controllers/rooms/updateRoom");
const { getRoomDetails } = require("../../controllers/rooms/getRoomDetails");
const { deleteRoom } = require("../../controllers/rooms/deleteRoom");

const router = Router();



router.post("/", createRoom);
router.get("/", listRooms);
// router.put("/rooms/:id", updateRoom);
// router.get("/rooms/:id", getRoomDetails);
// router.delete("/rooms/:id", deleteRoom);

module.exports = router;