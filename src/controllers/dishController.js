const { dish } = require('../db');

exports.createDish = async (req, res) => {
  try {
    const newDish = await dish.create(req.body);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el plato', error: error.message });
  }
}

exports.getDishes = async (req, res) => {
  try {
    const dishes = await dish.findAll();
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

    if (editDish) {
      return res.status(200).json({ ...dishUpdated.toJSON(), message: "Plato actualizado correctamente." }); // Se ha agregado .toJSON() para obtener solo los datos del plato actualizado
    } else {
      return res.status(400).json({ message: "No se pudo actualizar el plato." });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al editar el plato', error: error.message });
  }
}





exports.deleteDishes = async (req, res) => {
 const {id} = req.params;
try { 
  const dish = await dish.findByPk(id)
await dish.destroy()
  res.status(200).json({message:"Se eliminó correctamente"})
} catch (error) {
  res.status(500).json({ message: 'Error al eliminar el plato', error: error.message });
}

}