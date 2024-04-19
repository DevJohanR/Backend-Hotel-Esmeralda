const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const DB_CONFIG = require("./db_config");

const sslOptions = {
  rejectUnauthorized: false,
};

const isLocal = process.env.APP_ENV === "LOCAL";

const sequelize = new Sequelize(
  `postgres://${DB_CONFIG.DB_USER}:${DB_CONFIG.DB_PASSWORD}@${DB_CONFIG.DB_HOST}:${DB_CONFIG.DB_PORT}/${DB_CONFIG.DB_NAME}`,

  {
    logging: false,
    dialectOptions: {
      ssl: isLocal ? false : sslOptions,
    },
  }
);

console.log("Configuración de la base de datos:", DB_CONFIG);

const basename = path.basename(__filename);

const modelDefiners = [];

// Este código organiza y carga los modelos
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Incluyo la conexión de Sequelize a cada modelo
modelDefiners.forEach((model) => model(sequelize));

// Destructuring de los modelos
const {
  guest_profile,
  reservations,
  room_details,
  rooms,
  room_types,
  users,
  spa_reservations,
  car_reservations,
  car_details,
  room_spa,
  user_reservations,
  restaurant_reserv,
} = sequelize.models;

// Relaciones
users.hasOne(guest_profile, { foreignKey: "user_id", onDelete: "CASCADE" });
guest_profile.belongsTo(users, { foreignKey: "user_id" });

reservations.belongsTo(rooms, { foreignKey: "room_id" });
rooms.hasMany(reservations, { foreignKey: "room_id" });

users.hasMany(reservations, { foreignKey: "user_id" });
reservations.belongsTo(users, { foreignKey: "user_id" });

rooms.hasOne(room_details, { foreignKey: "room_id" });
room_details.belongsTo(rooms, { foreignKey: "room_id" });

room_types.hasMany(rooms, { foreignKey: "type_id" });
rooms.belongsTo(room_types, { foreignKey: "type_id" });

//RELACIONES RESERVA SPA

users.hasMany(spa_reservations, { foreignKey: "user_id" });
spa_reservations.belongsTo(users, { foreignKey: "user_id" });

spa_reservations.belongsTo(room_spa, { foreignKey: "spa_room_id" });
room_spa.hasMany(spa_reservations, { foreignKey: "spa_room_id" });

//RELACION RESERVA CARS

users.hasMany(car_reservations, { foreignKey: "user_id" });
car_reservations.belongsTo(users, { foreignKey: "user_id" });

car_reservations.belongsTo(car_details, { foreignKey: "car_id" });
car_details.hasMany(car_reservations, { foreignKey: "car_id" });

// RESERVA RESTAURANT

users.hasMany(restaurant_reserv, { foreignKey: "user_id" });
restaurant_reserv.belongsTo(users, { foreignKey: "user_id" });

//All reservations

user_reservations.belongsTo(reservations, {
  foreignKey: "room_reservation_id",
});
reservations.hasOne(user_reservations, { foreignKey: "room_reservation_id" });

user_reservations.belongsTo(spa_reservations, {
  foreignKey: "spa_reservation_id",
});
spa_reservations.hasOne(user_reservations, {
  foreignKey: "spa_reservation_id",
});

users.hasMany(user_reservations, { foreignKey: "user_id" });
user_reservations.belongsTo(users, { foreignKey: "user_id" });

user_reservations.belongsTo(restaurant_reserv, {
  foreignKey: "restaurant_reservation_id",
});
restaurant_reserv.hasMany(user_reservations, {
  foreignKey: "restaurant_reservation_id",
});

user_reservations.belongsTo(car_reservations, {
  foreignKey: "car_reservation_id",
});
car_reservations.hasMany(user_reservations, {
  foreignKey: "car_reservation_id",
});

module.exports = {
  ...sequelize.models,
  connect: sequelize,
};
