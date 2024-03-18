require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/hotel`,
  { logging: false } //esto es para evitar que cada consulta se imprima en consola
);

const basename = path.basename(__filename); // con esto podremos trabajar en base al directorio actual

const modelDefiners = [];

// este codigo organiza y carga los modelos
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

//Incluyo la conexion de sequelize a cada modelo
modelDefiners.forEach((model) => model(sequelize));

// destructuring de los modelos
const { guest_profile } = sequelize.models;
const { reservations } = sequelize.models;
const { room_details } = sequelize.models;
const { rooms } = sequelize.models;
const { room_types } = sequelize.models;
const { users } = sequelize.models;

// RELACIONES

users.hasOne(guest_profile, { foreignKey: "user_id" });
guest_profile.belongsTo(users, { foreignKey: "user_id" });

reservations.belongsTo(guest_profile, { foreignKey: "guest_profile_id" });
guest_profile.hasMany(reservations, { foreignKey: "guest_profile_id" });

reservations.belongsTo(rooms, { foreignKey: "room_id" });
rooms.hasMany(reservations, { foreignKey: "room_id" });

users.hasMany(reservations, { foreignKey: "user_id" });
reservations.belongsTo(users, { foreignKey: "user_id" });

room_details.belongsTo(rooms, { foreignKey: "room_id" });
rooms.hasOne(room_details, { foreignKey: "room_id" });

room_types.belongsTo(rooms, { foreignKey: "id" });
rooms.belongsTo(rooms, { foreignKey: "type_id" });

module.exports = {
  ...sequelize.models,
  connect: sequelize,
};
