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
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    car_id: {
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
      type: DataTypes.ENUM('pending',"paid" ,'confirmed', 'finalized', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
   },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  });
};