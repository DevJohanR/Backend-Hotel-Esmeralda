const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("car_reservations", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    reservation_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    checkInDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "finalized", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    car_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
