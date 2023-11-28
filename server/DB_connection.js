require('dotenv').config();
const {Sequelize} =  require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL} = process.env;

//importar modelos

const conection = DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const sequelize = new Sequelize(`${conection}`, {
    logging: false,
    native: false,
    ssl: true
})

// modelo importado (sequelize)

// const { extraigo models} = sequelize.models;

// hago relaciones n:m 1:1 1:N
module.exports = {
    //exporto modelos
    conn: sequelize,
};
