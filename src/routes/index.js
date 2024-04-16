// routes/index.js

const { Router } = require("express");
const dishesRoutes = require("./dishes/dishes");
const roomsRoutes = require("./rooms/rooms");
const roomsTypesRoutes = require("./rooms/roomsTypes");
const authRoutes = require("./users/users");
const chartsRoutes = require("./charts/charts");
const reservationsRoutes = require("./reservations/reservations");
const reservationEmailRoutes = require("./reservationEmailRoutes/reservationEmailRoutes");
const cars = require("./cars/cars");
const spa = require("./roomSpa/roomSpa");
const { authenticateToken } = require("../helpers/authenticateToken");
const express = require("express");
const { handleClerkWebhook } = require("../controllers/users/clerkWebhook"); // Asegúrate de ajustar la ruta según sea necesario

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenido" });
});

router.use("/api/dishes", dishesRoutes);
router.use("/api/rooms", roomsRoutes);
router.use("/api/cars", cars);
router.use("/api/roomstypes", roomsTypesRoutes);
router.use("/auth", authRoutes);
router.use("/api/reservations", authenticateToken, reservationsRoutes);
router.use(
  "/api/reservation-emails",
  authenticateToken,
  reservationEmailRoutes
);
router.use("/api/charts", authenticateToken, chartsRoutes);
router.use("/api/spa", spa);

router.post("/api/webhook", express.json(), handleClerkWebhook);

module.exports = router;
