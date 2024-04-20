const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("room_details", {
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.TEXT), 
      allowNull: true,
    },
    single_bed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    double_bed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    air_conditioning: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

    jacuzzi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    internet_connection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tv: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    minibar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    phone: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
};