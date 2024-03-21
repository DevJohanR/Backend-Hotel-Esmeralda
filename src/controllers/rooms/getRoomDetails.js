// const { rooms, room_details } = require('../../db');

// const getRoomDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const room = await rooms.findByPk(id, {
//       include: [{ model: room_details, as: "room_detail" }],
//     });
//     if (!room) {
//       return res.status(404).send("Room not found");
//     }
//     res.status(200).send(room);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// module.exports = { getRoomDetails };
