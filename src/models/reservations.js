const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("reservations", {
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
    guest_profile_id: {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};

// agregar roomid que relacione
