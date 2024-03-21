const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("rooms", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    room_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "busy", "maintenance"),
      allowNull: false,
    },
    price_per_night: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
