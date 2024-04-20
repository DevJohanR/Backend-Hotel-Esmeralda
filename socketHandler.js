const socketIO = require('socket.io');

function initializeSocketServer(httpServer) {
  const socketIOInstance = socketIO(httpServer, {
    cors: {
      origin: ["https://hotelesmeralda.netlify.app", "http://localhost:3000","http://localhost:5174"],
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  const clienteSalas = {};

  socketIOInstance.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('formData', (data) => {
      console.log('Datos recibidos del front para Reviews:', data);
      socket.emit('reviewReceived', 'Reseña recibida');
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado de Reviews');
    });

    socket.on('joinClientChat', (clientId) => {
      console.log(`Cliente ${clientId} se ha unido a su sala de chat.`);
      socket.join(clientId);
      
      if (!clienteSalas[clientId]) {
        clienteSalas[clientId] = true;
        console.log(`Sala ${clientId} agregada al registro.`);
      }
    });

    socket.on('clienteNotification', (data) => {
      console.log(`El administrador recibió una notificación para unirse a la sala del cliente: ${data.clienteId}`);
      socketIOInstance.to('Administrador').emit('clienteNotification', { clienteId: data.clienteId });
    });

    socket.on('joinAdminToClientRooms', () => {
      for (const room in clienteSalas) {
        socket.join(room);
        socket.emit('salaClienteIniciada', { clienteId: room });
      }
      console.log('El administrador se ha unido a todas las salas de clientes.');
    });

    socket.on('joinAdministrador', () => {
    socket.join('Administrador');
    console.log('Administrador se ha unido a la sala "Administrador"');
    socket.emit('administradorJoined', { message: 'Administrador se ha unido a la sala "Administrador"' });
    socketIOInstance.to('Administrador').emit('adminJoined', { message: 'Administrador se ha unido a la sala "Administrador"' });
  });

    socket.on('cliente_mensaje', (data) => {
      console.log(`Mensaje recibido al servidor del cliente ${data.clienteId}: ${data.mensaje}`);
      socketIOInstance.to('Administrador').emit('admin_mensaje', { clienteId: data.clienteId, mensaje: data.mensaje });
    });
    
    socket.on('bookNotification', (bookingData) => {
      socketIOInstance.to('Administrador').emit('adminNotification', bookingData);
      console.log(bookingData)
    });

    socket.on('mensaje_servidor', (data) => {
      console.log(`Mensaje del administrador para el cliente ${data.clienteId}: ${data.mensaje}`);
      socketIOInstance.to(data.clienteId).emit('mensaje_cliente', { clienteId: data.clienteId, mensaje: data.mensaje });
    });
  });
}

module.exports = initializeSocketServer;

