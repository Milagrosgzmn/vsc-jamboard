require('dotenv').config();
const {Sequelize} =  require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL} = process.env;
const userModel = require('./models/user');
const jamModel = require('./models/jamboard');
const contactModel = require('./models/contact');

const conection = DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const sequelize = new Sequelize(`${conection}`, {
    logging: false,
    native: false,
    ssl: true
})

userModel(sequelize);
jamModel(sequelize);
contactModel(sequelize)

const {Users, Jamboards, Contacts} = sequelize.models;

Users.belongsToMany(Jamboards, {through: 'userBoard'});
Jamboards.belongsToMany(Users, {through: 'userBoard'});

Users.belongsToMany(Users, {
    as:'contact',
    through: Contacts,
    foreignKey:'user_id',
    otherKey:'friend_id'
});
Users.belongsToMany(Users, {
    as:'contactAsFriend',
    through: Contacts,
    foreignKey:'friend_id',
    otherKey:'user_id'
});


module.exports = {
    Contacts,
    Users,
    Jamboards,
    conn: sequelize,
};
