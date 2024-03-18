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