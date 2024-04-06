const { Sequelize } = require("sequelize");
const { car_details, connect } = require("../../db");

const createCar = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    // Extracción de datos del cuerpo de la solicitud
    const { brands, photos, transmision, passenger, sport_car, type_car } =
      req.body;

    // Creación del carro con los datos proporcionados
    const newCar = await car_details.create(
      {
        brands,
        photos,
        transmision,
        passenger,
        sport_car,
        type_car,
      },
      { transaction }
    );

    console.log(newCar);

    // Confirmación de la transacción
    await transaction.commit();

    // Recuperación y envío del carro creado
    const car = await car_details.findByPk(newCar.id);
    if (!car) {
      return res.status(404).send("Car not found");
    }
    return res.status(200).send(car);
  } catch (error) {
    // Reversión de la transacción en caso de error
    await transaction.rollback();
    console.log(error);

    return res.status(500).json(error);
  }
};

module.exports = { createCar };
