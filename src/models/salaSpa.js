const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("spa_Rooms", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    spa_room: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    max_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    room_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_status: {
      type: DataTypes.ENUM("available", "unavailable"),
      allowNull: false,
      defaultValue: "available",
    },
  });
};
