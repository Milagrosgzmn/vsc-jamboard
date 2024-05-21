const { DataTypes} = require('sequelize')
const { Users } = require('../DB_connection')

module.exports = (sequelize)=>{
    const  Notifications = sequelize.define('Notifications',{
        issue: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        isRead:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        senderId: {
            type: DataTypes.UUID,
            references: {
                model: Users,
                key: 'id'
            }
        },
        receiverId: {
            type: DataTypes.UUID,
            references: {
                model: Users,
                key: 'id'
            }
        }
    },
    {
      timestamps:false,
    }
    )  
    Notifications.sentFriendReq = async function(user_id, friend_id){

        try {
            await this.create({
                issue: 'connectRequest',
                isRead: false,
                senderId: user_id,
                receiverId: friend_id
            });
            return true;
        } catch (error) {
            console.error('Error creating notification:', error);
        }


    }

    return Notifications;
}