const { Router } = require("express");
const { createCar } = require("../../controllers/cars/createCar");
const { listCar } = require("../../controllers/cars/listCard");
const { deleteCar } = require("../../controllers/cars/deleteCar");
const { editCars } = require("../../controllers/cars/editCar");
const {
  createCarReservation,
} = require("../../controllers/cars/reservationCar");

const router = Router();

router.post("/", createCar);
router.get("/", listCar);
router.patch("/:id", editCars);
router.delete("/:id", deleteCar);
router.post("/reservation", createCarReservation);
module.exports = router;
