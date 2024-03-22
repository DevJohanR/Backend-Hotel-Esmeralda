const { rooms, room_details } =  require('../../db');

const deleteRoom = async (req, res) => {
 try {
    const { id } = req.params;

    await sequelize.transaction(async (transaction) => {
      const room = await rooms.findByPk(id, { transaction });
      if (!room) {
        throw new Error("Room not found");
      }

      await room_details.destroy({ where: { room_id: id }, transaction });

      await room.destroy({ transaction });
    });

    res.status(200).send("Room deleted successfully");
 } catch (error) {
    res.status(500).send("Error deleting room");
 }
};

module.exports = { deleteRoom };
