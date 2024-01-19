require('dotenv').config();
const {Sequelize} =  require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL} = process.env;
const userModel = require('./models/user');
const jamModel = require('./models/jamboard');

const conection = DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const sequelize = new Sequelize(`${conection}`, {
    logging: false,
    native: false,
    ssl: true
})

userModel(sequelize);
jamModel(sequelize);

const {Users, Jamboards} = sequelize.models;

Users.belongsToMany(Jamboards, {through: 'userBoard'});
Jamboards.belongsToMany(Users, {through: 'userBoard'});

Users.belongsToMany(Users, {
    as:'friend_as_user',
    through: 'Contact',
    foreignKey:'user_id',
    otherKey:'friend_id'
});
Users.belongsToMany(Users, {
    as:'friends_as_friend',
    through: 'Contact',
    foreignKey:'friend_id',
    otherKey:'user_id'
});


module.exports = {
    Users,
    Jamboards,
    conn: sequelize,
};
