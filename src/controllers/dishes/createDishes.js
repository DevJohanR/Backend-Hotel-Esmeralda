const { dish } = require('../../db');

const createDish = async (req, res) => {
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

module.exports = { createDish };
