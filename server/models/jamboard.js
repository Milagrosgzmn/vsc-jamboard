const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    const Jamboards = sequelize.define('Jamboards',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        html:{
            type:DataTypes.STRING,
            defaultValue:''
        },
        css:{
            type:DataTypes.STRING,
            defaultValue:''
        },
        js:{
            type:DataTypes.STRING,
            defaultValue:''
        }
    })

    Jamboards.createBoard = async function (board) {
        try {
            const createdBoard = await this.create(board)
            return createdBoard;
        } catch (error) {
            console.error("Error while creating board:", error.message);
              throw error;
        }
        

    }

    return Jamboards;
}