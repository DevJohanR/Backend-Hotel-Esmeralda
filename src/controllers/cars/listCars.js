const { car_details } = require("../../db");

const listCar = async (req, res) => {
  try {
    const allCars = await car_details.findAll();

    res.status(200).send(allCars);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { listCar };
