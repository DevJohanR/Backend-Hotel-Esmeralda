const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index");

require("./db");

const server = express();

server.name = "API";

server.use(morgan("dev"));
server.use("/", routes);
//aaa

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
