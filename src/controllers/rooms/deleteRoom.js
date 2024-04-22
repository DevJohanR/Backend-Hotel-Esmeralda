const { rooms, room_details, connect } = require("../../db");

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    let deletedRoom = null;
    await connect.transaction(async (transaction) => {
      deletedRoom = await rooms.findByPk(id, { transaction });
      if (!deletedRoom) {
        throw new Error("Room not found");
      }

      await room_details.destroy({ where: { room_id: id }, transaction });

      await deletedRoom.destroy({ transaction });
    });

    res.status(200).json({ message: "Room deleted", deletedRoom });
  } catch (error) {
    if (error.message === "Room not found") {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(500).send("Error deleting room");
    }
  }
};

module.exports = { deleteRoom };
