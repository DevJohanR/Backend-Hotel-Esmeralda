require("dotenv").config();
const server = require("./src/app");
const initializers = require("./src/initializers");
const { connect } = require("./src/db");
const { DB_PORT } = require("./src/db_config") || 4000;

connect.sync({ force: false }).then(() => {
  console.log(`Database connected`);

  initializers
    .run(connect)
    .then(() => console.log("Initial Values Created"))
    .catch(() => console.log("Initial values already exists!"));

  server.listen(DB_PORT, () => {
    console.log(`Server in port ${DB_PORT}`);
  });
});
