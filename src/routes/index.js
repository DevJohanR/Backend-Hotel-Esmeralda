const { Router } = require("express");
const dishesRoutes = require("./dishes/dishes");
const roomsRoutes = require("./rooms/rooms");
const roomsTypesRoutes = require("./rooms/roomsTypes");
const authRoutes = require('./auth');

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenido" });
});

router.use("/api/dishes", dishesRoutes);
router.use("/api/rooms", roomsRoutes);
router.use("/api/roomstypes", roomsTypesRoutes);
router.use('/auth', authRoutes);



module.exports = router;


