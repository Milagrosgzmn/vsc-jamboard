const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Jamboards',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
        }
    })
}