const sequelize = require('../../db');

const createAllReservations = async (req, res) => {
  const { user_id, room_id, spa_room_id, car_id, check_in_date, checkOutDate, total_price } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const roomReservation = await sequelize.models.RoomReservation.create({
        user_id,
        room_id,
        fecha_inicio: check_in_date,
        fecha_fin: checkOutDate
      }, { transaction: t });

      const spaReservation = await sequelize.models.SpaReservation.create({
        user_id,
        spa_room_id,
        fecha_inicio: check_in_date,
        fecha_fin: checkOutDate,
        precio_total: total_price
      }, { transaction: t });

      const carReservation = await sequelize.models.CarReservation.create({
        user_id,
        car_id,
        fecha_inicio: check_in_date,
        fecha_fin: checkOutDate,
        precio_total: total_price
      }, { transaction: t });

      return { roomReservation, spaReservation, carReservation };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error creating reservations:', error);
    res.status(500).json({ message: 'Error creating reservations' });
  }
};

module.exports = { createAllReservations };
