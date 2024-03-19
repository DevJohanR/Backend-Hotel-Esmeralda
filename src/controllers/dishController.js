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
    const dish = await dish.findByPk(id)
    const editDishes = await dish.update(req.body)
    const dishUpdated = await dish.findByPk(id)

    if (editDishes){
      res.status(200).json({...dishUpdated,message:"Plato actualizado correctamente."})}

      else res.status(400).json({messag:"No se pudo actualizar"})
}
catch(error){
  res.status(500).json({ message: 'Error al editar el plato', error: error.message });
}
}


exports.delteDishes = async (req, res) => {
 const {id} = req.params;
try { 
  const dish = await dish.findByPk(id)
await dish.destroy()
  res.status(200).json({message:"Se eliminó correctamente"})
} catch (error) {
  res.status(500).json({ message: 'Error al eliminar el plato', error: error.message });
}

}