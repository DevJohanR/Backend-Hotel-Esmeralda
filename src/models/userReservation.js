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
    spaReservation_id: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carReservation_id: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    restaurantReservation_id: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "finalized", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  });
};