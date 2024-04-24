const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const cors = require("cors");

// Create server
const server = express();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

server.name = "API";

// Middlewares
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use(express.urlencoded({ limit: "20mb", extended: true }));
// Routes
server.use("/", routes);

// Error handling middleware
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
