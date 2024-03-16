const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("rooms", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    room_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("disponible", "ocupada", "mantenimiento"),
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
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
