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
        if(alreadyExists) throw Error('Email previamente registrado.');
        if(usernameInUse) throw Error('Nombre de usuario ya registrado.');

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
        const user = await this.findOne({where:{email}});
        if (!user) throw Error('Usuario o contraseña incorrectos.');
        const doesMatch = await bcrypt.compare(password,user.password);
        const userWithoutPassword = {
            id:user.id,
            email:user.email,
            username:user.username,
        }

        if (doesMatch) {
            return userWithoutPassword;
        } else {
            throw Error('Usuario o contraseña incorrectos.');   
        }
      }

      Users.addNewContact = async function(user_id, friend_id){
        try {
            const user = await this.findByPk(user_id);
            await user.addFriendAsUser(friend_id);
            return null; 
          } catch (error) {
            console.error("Error adding contact:", error.message);
            throw error;
          }
      } 

    return Users;
}