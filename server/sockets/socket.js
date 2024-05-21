const socket = require('socket.io');
const axios = require('axios');
function setSocketServer (server){
    const io = socket(server,{
        cors:{
            origin:'*'
        },
        connectionStateRecovery:{
            
        }
    });
    
    io.on('connection',(socket)=>{
        console.log('client connected');

        
        socket.on('code', async(data)=>{
            try {
                const url = process.env.BACKURL || 'http://localhost:3001/jamboard/board'
               
                await axios.put(`${url}/${data.id}`,{patch:data.patch})
                io.emit(`${data.id}`,{ 
                    patch:data.patch, 
                    user:data.user})
            } catch (error) {
                console.error(error);
                return
            }
        })
    })

    return io;
}

module.exports = setSocketServer;