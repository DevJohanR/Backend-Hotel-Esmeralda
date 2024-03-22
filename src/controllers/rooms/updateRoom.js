// const { rooms, room_details} = require('../../db');

// const updateRoom = async (req, res) => {
//   const transaction = await connect.transaction();
//   try {
//     const { id } = req.params;
//     const { roomData, roomDetailsData } = req.body;

//     let room = await rooms.findByPk(id, { transaction });
//     if (!room) {
//       await transaction.rollback();
//       return res.status(404).send("Room not found");
//     }
//     await rooms.update(roomData, { where: { id: id }, transaction });
//     if (roomDetailsData) {
//       await room_details.update(roomDetailsData, {
//         where: { room_id: id },
//         transaction,
//       });
//     }
//     await transaction.commit();
//     res.status(200).send("Room updated successfully");
//   } catch (error) {
//     await transaction.rollback();
//     res.status(500).send("Error updating room: " + error.message);
//   }
// };

// module.exports = { updateRoom };

const { rooms, room_details, connect } = require('../../db');

const updateRoom = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;
    const { roomData, roomDetailsData } = req.body;

    let room = await rooms.findByPk(id, { transaction });
    if (!room) {
      await transaction.rollback();
      return res.status(404).send("Room not found");
    }
    await rooms.update(roomData, { where: { id: id }, transaction });
    if (roomDetailsData) {
      await room_details.update(roomDetailsData, {
        where: { room_id: id },
        transaction,
      });
    }
    await transaction.commit();
    res.status(200).send("Room updated successfully");
  } catch (error) {
    await transaction.rollback();
    res.status(500).send("Error updating room: " + error.message);
  }
};

module.exports = { updateRoom };
