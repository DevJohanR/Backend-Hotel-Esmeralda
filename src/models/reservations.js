const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("reservations", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      
    },
    reservation_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_in_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'finalized', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
   },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};