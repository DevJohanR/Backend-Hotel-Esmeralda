const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "guest_profile",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("masculino", "femenino", "otro"),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
