const { rooms, room_details, room_types, connect } = require("../../db");

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
    console.log(roomDetailsData);
    if (roomDetailsData) {
      await room_details.update(roomDetailsData, {
        where: { room_id:id },
        transaction,
      });
    }
    await transaction.commit();
    const roomEdited = await rooms.findAll({
      where: { id },
      include: [
        { model: room_types, as: "room_type" },
        { model: room_details, as: "room_detail" },
      ],
    });

    return res.status(200).send(roomEdited);
  } catch (error) {
    console.log(error);

    await transaction.rollback();
    console.log(error.message);

    return res.status(500).send("Error updating room: " + error.message);
  }
};

module.exports = { updateRoom };
