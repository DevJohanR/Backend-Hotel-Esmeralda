//app.js
// Initialize express server
const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const routes = require("./routes/index");
const cors = require("cors");

// Create server
const server = express();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Aquí puedes agregar código para manejar el error, como enviar un registro o notificar al usuario
});

server.name = "API";

//Midlewares
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

//Routes
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
