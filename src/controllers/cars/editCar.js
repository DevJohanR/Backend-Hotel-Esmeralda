const { car_details } = require("../../db");

const editCars = async (req, res) => {
  try {
    const { id } = req.params;
    const carToUpdate = await car_details.findByPk(id);
    if (!carToUpdate) {
      return res.status(404).json({ message: "Car not found." });
    }
    const editedCar = await carToUpdate.update(req.body);
    const carUpdated = await car_details.findByPk(id);

    if (editedCar && carUpdated) {
      const allCars = await car_details.findAll();

      return res.status(200).json({
        editedCar: carUpdated.toJSON(),
        allCars: allCars.map((d) => d.toJSON()),
        message: "Correctly updated car and list of all cars.",
      });
    } else {
      return res.status(400).json({ message: "Could not update the car." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error when editing car", error: error.message });
  }
};

module.exports = { editCars };
