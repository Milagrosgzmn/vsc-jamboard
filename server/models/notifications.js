const { DataTypes} = require('sequelize')

module.exports = (sequelize)=>{
    const  Notifications = sequelize.define('Notifications',{
        issue: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    
    },
    {
      timestamps:false,
    }
    )  

    return Notifications;
}