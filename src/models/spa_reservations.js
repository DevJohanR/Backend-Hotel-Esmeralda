const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("spa_reservations", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    status: {
      type: DataTypes.ENUM("active", "cancelled", "completed"),
      allowNull: false,
      defaultValue: "active",
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    spa_room_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};
