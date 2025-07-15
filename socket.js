const { Server } = require('socket.io');
module.exports.setupSocket = (server) => {
    const io = new Server(server, { cors: { origin: '*' } });
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('subscribeAlers', userID => socket.join(userId));
    });
};