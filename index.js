const server = require("./src/app");
const { connect } = require("./src/db");

connect.sync({ force: true }).then(() => {
  server.listen(3000, () => {
    console.log("Server in port 3000");
  });
});
