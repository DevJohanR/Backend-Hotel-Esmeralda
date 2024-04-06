//routes/users/index.js
const { Router } = require("express");
const dishesRoutes = require("./dishes/dishes");
const roomsRoutes = require("./rooms/rooms");
const roomsTypesRoutes = require("./rooms/roomsTypes");
const authRoutes = require("./users/users");
const chartsRoutes = require("./charts/charts");
const reservationsRoutes = require("./reservations/reservations");
const { authenticateToken } = require("../helpers/authenticateToken");

const cars = require("./cars/cars");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenido" });
});

router.use("/api/dishes", dishesRoutes);
router.use("/api/rooms", roomsRoutes);
router.use("/api/cars", cars);
router.use("/api/roomstypes", roomsTypesRoutes);
router.use("/auth", authRoutes);
router.use("/api/reservations", reservationsRoutes);
router.use("/api/charts", chartsRoutes);

module.exports = router;
