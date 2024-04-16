const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("room_spa", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    service_type: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    room_status: {
      type: DataTypes.ENUM("available", "unavailable"),
      allowNull: false,
      defaultValue: "available",
    },
  });
};
