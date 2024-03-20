const { dish } = require('../db');

exports.createDish = async (req, res) => {
  try {
     const newDish = await dish.create(req.body);
     const allDishes = await dish.findAll();
     res.status(201).json({
       newDish: newDish,
       allDishes: allDishes,
       message: "Plato creado correctamente y lista de todos los platos."
     });
  } catch (error) {
     res.status(500).json({ message: 'Error al crear el plato', error: error.message });
  }
 };
 
exports.getDishes = async (req, res) => {
  try {
    const dishes = await dish.findAll();
    if (dishes.length === 0) {
      return res.status(200).json({ message: 'No hay platos disponibles.' });
    }
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los platos', error: error.message });
  }
}



exports.editDishes = async (req, res) => {
  try {
     const { id } = req.params;
     const dishToUpdate = await dish.findByPk(id); 
     if (!dishToUpdate) {
       return res.status(404).json({ message: "Plato no encontrado." });
     }
     const editDish = await dishToUpdate.update(req.body); 
     const dishUpdated = await dish.findByPk(id); 
 
     if (editDish && dishUpdated) {
       const allDishes = await dish.findAll(); 
 
       return res.status(200).json({ 
         editedDish: dishUpdated.toJSON(), 
         allDishes: allDishes.map(d => d.toJSON()), 
         message: "Plato actualizado correctamente y lista de todos los platos." 
       }); 
     } else {
       return res.status(400).json({ message: "No se pudo actualizar el plato." });
     }
  } catch (error) {
     return res.status(500).json({ message: 'Error al editar el plato', error: error.message });
  }
 }

 
 

exports.deleteDishes = async (req, res) => {
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
 }
 