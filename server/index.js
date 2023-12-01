const app = require('./app');
const {conn} = require('./DB_connection');

const PORT = process.env.PORT || 3001;

conn.sync({force:false}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Se levantó con exito el server en el puerto ${PORT}`);
    });
});
