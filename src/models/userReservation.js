const { DataTypes, Sequelize } = require("sequelize");

function generateReservationNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  let result = '';
  for (let i = 0; i < 3; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 3; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
console.log(result);
  return result;
}


module.exports = (sequelize) => {
  const UserReservations = sequelize.define("user_reservations", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    reservation_number: {
      type: DataTypes.STRING(6),
      allowNull: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    stripe_session_id: {  
      type: DataTypes.STRING,
      allowNull: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    spa_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    car_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    restaurant_reservation_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_in_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'pay', 'confirmed', 'finalized', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  });

  UserReservations.beforeCreate((reservation, options) => {
    reservation.reservation_number = generateReservationNumber();
  });

  return UserReservations;
};

