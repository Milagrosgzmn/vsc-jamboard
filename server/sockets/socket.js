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
                let newBoard = {};
                
                if(data.language === 'xml') newBoard.html = data.code;
                if(data.language === 'css') newBoard.css = data.code;
                if(data.language === 'javascript') newBoard.js = data.code;
            
                await axios.put(`${url}/${data.id}`,{newBoard})
            } catch (error) {
                console.error(error);
                return
            }
            
            io.emit(`${data.id}`, data)
        })
    })

    return io;
}

module.exports = setSocketServer;