//index.js
require("dotenv").config();
const express = require('express');
const http = require('http');
const initializers = require("./src/initializers");
const { connect } = require("./src/db");
const { DB_PORT, SOCKET_IO_PORT } = process.env;
const initializeSocketServer = require('./socketHandler'); 
const cors = require('cors');

const app = require('./src/app');
const httpServer = http.createServer(app);



httpServer.listen(DB_PORT, () => {
  console.log(`Main server running on port ${DB_PORT}`);
});

app.use(cors());

// Crear servidor de Socket.IO
const socketServer = http.createServer();

// Inicializar el servidor de Socket.IO
initializeSocketServer(socketServer);

socketServer.listen(SOCKET_IO_PORT, () => {
  console.log(`Socket.IO server running on port ${SOCKET_IO_PORT}`);
});

connect.sync({ alter:true }).then(() => {
  console.log(`Database connected`);

  initializers
    .run(connect)
    .then(() => console.log("Initial Values Created"))
    .catch(() => console.log("Initial values already exists!"));
});


