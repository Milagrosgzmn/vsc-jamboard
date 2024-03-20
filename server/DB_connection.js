require('dotenv').config();
const {Sequelize} =  require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL} = process.env;
const userModel = require('./models/user');
const jamModel = require('./models/jamboard');
const contactModel = require('./models/contact');
const userBoardModel = require('./models/userBoard');
const notifcationsModel = require('./models/notifications');

const conection = DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const sequelize = new Sequelize(`${conection}`, {
    logging: false,
    native: false,
    ssl: true
})

userModel(sequelize);
jamModel(sequelize);
contactModel(sequelize)
userBoardModel(sequelize);
notifcationsModel(sequelize);

const {Users, Jamboards, Contacts, UserBoard, Notifications} = sequelize.models;

Users.belongsToMany(Jamboards, {through: UserBoard});
Jamboards.belongsToMany(Users, {through: UserBoard});

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

Users.belongsToMany(Users, {
    as:'sender',
    through: Notifications,
    foreignKey:'senderId',
    otherKey:'receiverId'
});
Users.belongsToMany(Users, {
    as:'receiver',
    through: Notifications,
    foreignKey:'receiverId',
    otherKey:'senderId'
});


module.exports = {
    Contacts,
    Users,
    Jamboards,
    UserBoard,
    Notifications,
    conn: sequelize,
};
