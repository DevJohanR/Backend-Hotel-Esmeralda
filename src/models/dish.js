const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dish', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};