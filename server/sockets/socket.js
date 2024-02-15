const socket = require('socket.io');

function setSocketServer (server){
    const io = socket(server,{
        cors:{
            origin:'*'
        }
    });
    
    io.on('connection',(socket)=>{
        console.log('client connected');

        socket.on('code', (data)=>{
            io.emit(`${data.id}`, data)
        })
    })

    return io;
}

module.exports = setSocketServer;