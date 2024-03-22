const { dish } = require('../../db');

const getDishes = async (req, res) => {
  try {
    const dishes = await dish.findAll();
    if (dishes.length === 0) {
      return res.status(200).json({ message: 'No hay platos disponibles.' });
    }
    const categories = [...new Set(dishes.map(d => d.category))];

    const response = {
      dishes: dishes,
      categories: categories
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los platos', error: error.message });
  }
};

module.exports = { getDishes };
