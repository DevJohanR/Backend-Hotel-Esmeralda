const { dish } = require('../../db');

const getDishes = async (req, res) => {
  try {
    // Obtener todos los platos
    const dishes = await dish.findAll();

    if (dishes.length === 0) {
      return res.status(200).json({ message: 'No hay platos disponibles.' });
    }

    // Obtener todas las categorías distintas de los platos
    const categories = [...new Set(dishes.map(d => d.category))];

    // Combinar los platos y las categorías en un objeto de respuesta
    const response = {
      dishes: dishes,
      categories: categories
    };

    // Enviar la respuesta
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los platos', error: error.message });
  }
};

module.exports = { getDishes };
