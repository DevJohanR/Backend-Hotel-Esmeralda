const { Router } = require("express");
const { createCar } = require("../../controllers/cars/createCar");
const { listCar } = require("../../controllers/cars/listCars");
const { deleteCar } = require("../../controllers/cars/deleteCar");
const { editCars } = require("../../controllers/cars/editCar");
const {createCarReservation,} = require("../../controllers/cars/reservation_car");
const { editCarReservation } = require("../../controllers/cars/edit_reserv");
const {cancelCarReservation,} = require("../../controllers/cars/cancel_reserv");

const router = Router();

router.post("/", createCar);
router.get("/", listCar);
router.patch("/:id", editCars);
router.delete("/:id", deleteCar);
router.post("/reservation", createCarReservation);
router.patch("/edit_reserv/:id", editCarReservation);
router.patch("/cancel_reserv/:id", cancelCarReservation);

module.exports = router;
