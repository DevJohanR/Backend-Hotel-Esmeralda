const { car_details } = require("../../db");

const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const carToDelete = await car_details.findByPk(id);
    if (!carToDelete) {
      return res.status(404).json({ message: "Car not found." });
    }
    await carToDelete.destroy();

    const remainingCars = await car_details.findAll();
    res
      .status(200)
      .json({
        message: "Car removed successfully.",
        car_details: remainingCars,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when deleting car", error: error.message });
  }
};

module.exports = { deleteCar };
