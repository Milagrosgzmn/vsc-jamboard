const app = require('./app');
const {conn} = require('./DB_connection');
const setSocketServer = require('./sockets/socket');

const PORT = process.env.PORT || 3001;

conn.sync({force:false}).then(()=>{
    const server = app.listen(PORT, ()=>{
        console.log(`Se levantó con exito el server en el puerto ${PORT}`);
    });
    setSocketServer(server)
});


