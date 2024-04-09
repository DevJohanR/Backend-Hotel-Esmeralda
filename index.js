
require("dotenv").config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const initializers = require("./src/initializers");
const { connect } = require("./src/db");
const { DB_PORT, SOCKET_IO_PORT } = process.env;

const cors = require("cors");
const app = express();
const httpServer = http.createServer(app); // Usamos el mismo servidor HTTP para Express y Socket.IO

// El servidor principal escucha en DB_PORT
httpServer.listen(DB_PORT, () => {
  console.log(`Main server running on port ${DB_PORT}`);
});

// Creo un servidor de Socket.IO independiente que escuche en SOCKET_IO_PORT
const socketServer = http.createServer();
const socketIOInstance = socketIO(socketServer);
socketServer.listen(SOCKET_IO_PORT, () => {
  console.log(`Socket.IO server running on port ${SOCKET_IO_PORT}`);
});

// Manejo de la conexión del cliente con Reviews
socketIOInstance.on('connection', (socket) => {
  console.log('Nuevo cliente conectado a Reviews');

  // Manejo de los datos del frontend para Reviews
  socket.on('formData', (data) => {
    console.log('Datos recibidos del frontend para Reviews:', data);

    // Envío una respuesta al frontend para Reviews
    socket.emit('reviewReceived', 'Reseña recibida');
  });

  // Manejo de la desconexión del cliente en Reviews
  socket.on('disconnect', () => {
    console.log('Cliente desconectado de Reviews');
  });

  socket.on('mensaje_cliente', (data) => {
    // Envio el mensaje a Administrador
    console.log('Mensaje recibido de RegularClient:', data);
    // Envío el mensaje a todos los clientes en la sala 'Administrador' (solo Administrador)
    socket.to('Administrador').emit('mensaje_servidor', data);
  });
  
  socket.on('joinAdministrador', () => {
    // El cliente RegularClient se une a la sala 'Administrador'
    socket.join('Administrador');
  });
  
  socket.on('mensaje_servidor', (data) => {
    // Envio el mensaje al RegularClient que inició la conversación
    console.log('Mensaje recibido de Administrador:', data);
    // Envío el mensaje al cliente que inició la conversación en la sala 'AsesorHotel'
    socket.to('RegularClient').emit('mensaje_cliente', data);
  });
  
  socket.on('joinRegularClient', () => {
    // El Administrador se une a la sala 'Administrador'
    socket.join('RegularClient');
  });
});  

connect.sync({ alter:true }).then(() => {
  console.log(`Database connected`);

  initializers
    .run(connect)
    .then(() => console.log("Initial Values Created"))
    .catch(() => console.log("Initial values already exists!"));
});






// require("dotenv").config();
// const server = require("./src/app");
// const initializers = require("./src/initializers");
// const { connect } = require("./src/db");
// const { DB_PORT } = process.env;

// connect.sync({ alter:true}).then(() => {
//   console.log(`Database connected`);

//   initializers
//     .run(connect)
//     .then(() => console.log("Initial Values Created"))
//     .catch(() => console.log("Initial values already exists!"));

//   server.listen(DB_PORT, () => {
//     console.log(`Server in port ${DB_PORT}`);
//   });
// });
