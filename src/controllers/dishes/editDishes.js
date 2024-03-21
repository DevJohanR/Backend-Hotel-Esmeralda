const { dish } = require('../../db');

const editDishes = async (req, res) => {
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
};

module.exports = { editDishes };
