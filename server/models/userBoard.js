const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    const  UserBoard = sequelize.define('UserBoard',{
        role: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    },
    {
      timestamps:false,
    }
    )  
    

    return UserBoard;
}