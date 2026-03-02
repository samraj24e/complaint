const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket client connected: ${socket.id}`);

    socket.on('trip:subscribe', (routeId) => {
      socket.join(`route:${routeId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket client disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSocket;
