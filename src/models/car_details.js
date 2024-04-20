const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("car_details", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    brands: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    transmision: {
      type: DataTypes.ENUM("Manual", "Automatic", "Hybrid"),
      allowNull: false,
      defaultValue: "Manual", // Cambiado de 'manual' a 'Manual', pilas muchachos
    },
    passenger: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_car: {
      type: DataTypes.ENUM("Sedan", "Coupe", "Family","Sport"),
      allowNull: false,
      defaultValue: "Sedan",
    },
    price_per_day: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("available", "busy", "maintenance"),
      allowNull: false,
      defaultValue: "available" 
    },
  });
};