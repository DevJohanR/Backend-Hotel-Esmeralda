const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("spa_reservations", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    spa_room_id: {
      type: DataTypes.UUID,
      allowNull: false,
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
      type: DataTypes.ENUM('pending','paid', 'confirmed', 'finalized', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
   },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  });
};