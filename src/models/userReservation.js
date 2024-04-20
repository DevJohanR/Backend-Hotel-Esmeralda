const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  return sequelize.define("user_reservations", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    room_reservation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spa_reservation_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    car_reservation_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    restaurant_reservation_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'finalized', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
   },
  });
};