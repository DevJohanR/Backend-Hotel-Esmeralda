require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { USER, PASSWORD, HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}/hotel`,
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
const { users } = sequelize.models;

// relaciones
users.hasOne(guest_profile, { foreignKey: "id" });
guest_profile.belongsTo(users, { foreignKey: "id" });

module.exports = {
  ...sequelize.models,
  connect: sequelize,
};
