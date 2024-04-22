const { dish } = require('../../db');

const createDish = async (req, res) => {
  try {
    
    const maxIdResult = await dish.max('id');
    const newId = maxIdResult + 1;

    
    const newDishData = { ...req.body, id: newId };
    const newDish = await dish.create(newDishData);

    const allDishes = await dish.findAll();
    res.status(201).json({
      newDish: newDish,
      allDishes: allDishes,
      message: "Plato creado correctamente y lista de todos los platos."
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: 'Un error de duplicación de clave única ha ocurrido',
        detail: error.parent.detail,
      });
    }
    // Otros manejo de errores
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { createDish };
