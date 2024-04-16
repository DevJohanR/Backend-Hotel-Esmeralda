const { Op, Sequelize } = require('sequelize');
const { rooms, reservations, room_types, room_details } = require('../../db');

const findAvailableRoom = async (req, res, next) => {
 try {
     const { from, to, capacity } = req.query;
 
     const fromDate = new Date(from).toISOString();
     const toDate = new Date(to).toISOString();
     const availableRooms = await rooms.findAll({
       where: {
         max_capacity: {
           [Op.gte]: capacity
         },
         id: {
           [Op.notIn]: Sequelize.literal(`(SELECT DISTINCT room_id FROM reservations WHERE ((check_in_date <= '${toDate}' AND check_out_date >= '${fromDate}')) OR (check_in_date >= '${fromDate}' AND check_in_date <= '${toDate}') OR (check_out_date >= '${fromDate}' AND check_out_date <= '${toDate}'))`)
         }
       },
       include: [
         {
           model: room_types, 
           as: 'room_type',
         },
         {
           model: room_details, 
           as: 'room_detail',
         }
       ]
     });
 
     if (availableRooms.length === 0) {
       return res.status(404).json({ message: 'No hay habitaciones disponibles para el rango de fechas solicitado o con la capacidad requerida' });
     }
     console.log('hola mundo')
     res.status(200).json({ message: 'Habitaciones disponibles encontradas', rooms: availableRooms });
 } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Error al buscar habitaciones disponibles' });
 }
};
 
module.exports = { findAvailableRoom };