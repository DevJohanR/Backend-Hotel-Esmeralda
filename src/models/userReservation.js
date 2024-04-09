const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("user_reservations", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomReservation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spaReservation_Id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    carReservation_Id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
  });
};
