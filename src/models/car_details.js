const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("car_details", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    brands: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    transmision: {
      type: DataTypes.ENUM("manual", "automatic", "manualandautomatic"),
      allowNull: false,
      defaultValue: "manual",
    },
    passenger: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sport_car: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    type_car: {
      type: DataTypes.ENUM("sedan", "coupe", "minivan"),
      allowNull: false,
      defaultValue: "sedan",
    },
  });
};
