const { Op, Sequelize } = require('sequelize');
const { rooms, reservations } = require('../../db');

const findAvailableRoom = async (req, res, next) => {
 try {
    const { from, to, capacity } = req.body;

    const fromDate = new Date(from).toISOString();
    const toDate = new Date(to).toISOString();

    // Buscar habitaciones disponibles que no estén reservadas durante el rango de fechas
    // y que tengan una capacidad igual o mayor a la requerida
    const availableRooms = await rooms.findAll({
      where: {
        status: 'available',
        max_capacity: {
          [Op.gte]: capacity
        },
        id: {
          [Op.notIn]: Sequelize.literal(`(SELECT DISTINCT room_id FROM reservations WHERE ((check_in_date <= '${toDate}' AND check_out_date >= '${fromDate}')) OR (check_in_date >= '${fromDate}' AND check_in_date <= '${toDate}') OR (check_out_date >= '${fromDate}' AND check_out_date <= '${toDate}'))`)
        }
      }
    });

    if (availableRooms.length === 0) {
      return res.status(404).json({ message: 'No hay habitaciones disponibles para el rango de fechas solicitado o con la capacidad requerida' });
    }

    res.status(200).json({ message: 'Habitaciones disponibles encontradas', rooms: availableRooms });
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar habitaciones disponibles' });
 }
};

module.exports = { findAvailableRoom };
