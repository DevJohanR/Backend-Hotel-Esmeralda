const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("restaurant_reserv", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    number_of_diners: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reservation_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
