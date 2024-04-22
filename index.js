require("dotenv").config();
const express = require("express");
const http = require("http");
const initializers = require("./src/initializers");
const { connect } = require("./src/db");
const { DB_PORT, SOCKET_IO_PORT } = process.env;
const initializeSocketServer = require("./socketHandler");
const cors = require("cors");

const app = require("./src/app");

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
});

// Crear un servidor HTTP y pasarlo a Socket.IO
const httpServer = http.createServer(app);

// Inicializar el servidor de Socket.IO con el servidor HTTP compartido
initializeSocketServer(httpServer);

httpServer.listen(DB_PORT, () => {
  console.log(`Main server running on port ${DB_PORT}`);
});

// app.use(cors());

// No es necesario crear un servidor HTTP separado para Socket.IO
// ya que httpServer ya está siendo utilizado para ambos propósitos

connect.sync({ alter: false }).then(() => {
  console.log(`Database connected`);

  initializers
    .run(connect)
    .then(() => console.log("Initial Values Created"))
    .catch(() => console.log("Initial values already exists!"));
});
