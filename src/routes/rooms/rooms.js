const { Router } = require("express");
const { createRoom } = require("../../controllers/rooms/createRoom");
const { listRooms } = require("../../controllers/rooms/listRooms");
const { updateRoom } = require("../../controllers/rooms/updateRoom");
const { getRoomDetails } = require("../../controllers/rooms/getRoomDetails");
const { deleteRoom } = require("../../controllers/rooms/deleteRoom");
const { authenticateToken } = require("../../helpers/authenticateToken");
const { findAvailableRoom } = require("../../controllers/rooms/findAvailableRoom");


const router = Router();



router.post("/",authenticateToken, createRoom);
router.get("/", listRooms);
router.get("/available", findAvailableRoom);
router.patch("/:id",authenticateToken, updateRoom);
router.get("/:id", getRoomDetails);
router.delete("/:id",authenticateToken, deleteRoom);

module.exports = router;