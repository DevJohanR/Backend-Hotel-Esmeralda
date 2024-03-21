const { rooms, room_types, room_details} = require('../../db');

const listRooms = async (req, res) => {
  try {
    const { status, type_rooms } = req.query;
    const whereClause = {};
    if (status) whereClause.status = status;
    if (type_rooms) whereClause.type_rooms = type_rooms;

    const allRooms = await rooms.findAll({
      where: whereClause,
      include: [{ model: room_types, as: 'room_type' }
        , { model: room_details, as: 'room_detail' }], 
    });
    

    res.status(200).send(allRooms);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { listRooms };
