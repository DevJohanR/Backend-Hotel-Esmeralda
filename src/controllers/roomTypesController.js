const { rooms, room_details, room_types } = require("../db");
const { connect } = require("../db");

exports.createRoomType = async (req, res) => {
  try {
    //Creating roomType
    const newRoomType = await connect.models.room_types.create({
      name: req.body.name,
      description: req.body.description,
    });

    return res.status(201).json({
      message: "Room Type Created successfully!",
      roomType: newRoomType,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "The Room Type already exist!" });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
// Get roomTypes(No parameters=all, admitted parameters: name, id)
exports.listRoomTypes = async (req, res) => {
  try {
    const { id } = req.query;
    const whereClause = {};
    if (id) whereClause.id = Number(id);
    console.log(whereClause);

    const allRoomTypes = await room_types.findAll({ where: whereClause });
    return res.status(200).send(allRoomTypes);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// Update RoomType
exports.updateRoomTypeById = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    let roomType = await room_types.findByPk(id, { transaction });
    if (!roomType) {
      await transaction.rollback();
      return res.status(404).send("Room not found");
    }
    const result = await room_types.update(
      { name: name, description: description },
      { where: { id: id }, transaction }
    );
    await transaction.commit();
    if (result > 0) res.status(200).send("Room Type updated successfully!");
    else return res.status(500).send("Error updating room type");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send("Error updating room: " + error.message);
  }
};

//Delete Room Type
exports.deleteRoomTypeById = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const { id } = req.params;
    const { verification } = req.body;
    if (verification !== "admin")
      return res
        .status(400)
        .send("Please send the admin verification to perform this action.");
    const roomType = await room_types.findByPk(id, { transaction });
    if (!roomType) {
      await transaction.rollback();
      return res.status(404).send("Room Type not found");
    }
    await room_types.destroy({ where: { id: id } }, { transaction });

    await transaction.commit();
    return res.status(200).send("Room type deleted successfully");
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send("Error deleting room type");
  }
};
