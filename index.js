require("dotenv").config();
const server = require("./src/app");
const { connect } = require("./src/db");
const { PORT } = process.env || 3000;

connect.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server in port ${PORT}`);
  });
});
