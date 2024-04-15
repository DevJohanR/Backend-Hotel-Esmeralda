const { car_details } = require("../../db");

const listCar = async (req, res) => {
  try {
    // ej con dos filtros opcionales
    //    const { brand, type_car } = req.query;
    //    const whereClause = {};
    //    if (brand) whereClause.brands = brand;
    //    if (type_car) whereClause.type_car = type_car;

    //    const allCars = await car_details.findAll({
    //      where: whereClause,
    //});
    const allCars = await car_details.findAll();

    res.status(200).send(allCars);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { listCar };
