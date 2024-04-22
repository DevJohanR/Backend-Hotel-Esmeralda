const { Router } = require("express");
const roomTypesController = require("../../controllers/rooms/roomTypesController");

const router = Router();

router.post("/", roomTypesController.createRoomType);
router.get("/", roomTypesController.listRoomTypes);
router.put("/:id", roomTypesController.updateRoomTypeById);
router.delete("/:id", roomTypesController.deleteRoomTypeById);

module.exports = router;