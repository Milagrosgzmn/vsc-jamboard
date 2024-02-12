const socket = require('socket.io');

function setSocketServer (server){
    const io = socket(server);

    io.on('connection',(socket)=>{
        console.log('client connected');
    })

    return io;
}

module.exports = setSocketServer;