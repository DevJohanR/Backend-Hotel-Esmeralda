const { Sequelize } = require("sequelize");
const { car_details, connect } = require("../../db");

const createCar = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const {
      brands,
      photos,
      transmision,
      passenger,
      sport_car,
      type_car,
      price_per_day,
      description,
    } = req.body;

    const newCar = await car_details.create(
      {
        brands,
        photos,
        transmision,
        passenger,
        sport_car,
        type_car,
        price_per_day,
        description,
      },
      { transaction }
    );

    console.log(newCar);

    await transaction.commit();

    const car = await car_details.findByPk(newCar.id);
    if (!car) {
      return res.status(404).send("Car not found");
    }
    return res.status(200).send(car);
  } catch (error) {
    await transaction.rollback();
    console.log(error);

    return res.status(500).json(error);
  }
};

module.exports = { createCar };
