const { dish } = require('../../db');

const deleteDishes = async (req, res) => {
  const { id } = req.params;
  try {
     const dishToDelete = await dish.findByPk(id);
     if (!dishToDelete) {
       return res.status(404).json({ message: "Plato no encontrado." });
     }
     await dishToDelete.destroy();
     // Después de eliminar el plato, obtener todos los platos restantes
     const remainingDishes = await dish.findAll();
     // Devolver los platos restantes en la respuesta
     res.status(200).json({ message: "Plato eliminado correctamente.", dishes: remainingDishes });
  } catch (error) {
     res.status(500).json({ message: 'Error al eliminar el plato', error: error.message });
  }
};

module.exports = { deleteDishes };
