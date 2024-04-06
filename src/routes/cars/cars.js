const { Router } = require("express");
const { createCar } = require("../../controllers/cars/createCar");
const { listCar } = require("../../controllers/cars/listCard");

const router = Router();

router.post("/", createCar);
router.get("/", listCar);

module.exports = router;
