require("dotenv").config();
const server = require("./src/app");
const initializers = require("./src/initializers");
const { connect } = require("./src/db");
const { PORT } = process.env || 3001;

connect.sync({ force: true }).then(() => {
  console.log(`Database connected`);

  initializers
    .run(connect)
    .then(() => console.log("Initial Values Created"))
    .catch(() => console.log("Initial values already exists!"));

  server.listen(PORT, () => {
    console.log(`Server in port ${PORT}`);
  });
});
