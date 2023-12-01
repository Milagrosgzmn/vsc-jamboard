const bcrypt = require('bcrypt');
const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    const Users = sequelize.define('Users',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
            validate:{
               isEmail: true,   
            }
         },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        timestamps:false,
    }
    )

    Users.signUp = async function (email,password, username) {
        const alreadyExists = await this.findOne({where:{email}});
        const usernameInUse = await this.findOne({where:{username}});
        if(alreadyExists) throw Error('Email already in use');
        if(usernameInUse) throw Error('Username already in use');

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await this.create({
            email,
            username,
            password:hashedPassword,
        });
        return user;
      };    
    
      Users.login = async function(email, password){
        const user = await Users.findOne({where:{email}});
        if (!user) throw Error('User not found');
        const doesMatch = await bcrypt.compare(password,user.password);
        const userWithoutPassword = {
            id:user.id,
            email:user.email,
            username:user.username,
        }

        if (doesMatch) {
            return userWithoutPassword;
        } else {
            throw Error('Wrong');   
        }
      }

    return Users;
}