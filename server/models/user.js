const bcrypt = require('bcrypt');
const {DataTypes, Op} = require('sequelize');

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
      Users.getUser = async function(user_id){
        try {
          const user = await this.findByPk(user_id);
          
          if(!user) throw new Error('Error while getting user, check data');
          return user;

        } catch (error) {
          console.error("Error getting user:", error.message);
            throw error;
        }
      }
      Users.addNewContact = async function(user_id, friend_id){
        try {
            const user = await this.findByPk(user_id);
            await user.addContact(friend_id);
            return null; 
          } catch (error) {
            console.error("Error adding contact:", error.message);
            throw error;
          }
      } 

      Users.getContacts = async function(user_id){
        try {
          const user = await this.findByPk(user_id,{
            attributes: { exclude: ['Contacts'] }
          });
          if(!user)throw new Error('Información incorrecta')
          const contactsAsUser = await user.getContact({
            attributes: ['id', 'username']
        });
          const contactsAsFriend = await user.getContactAsFriend({
            attributes: ['id', 'username'],
      });
  
          return [...contactsAsFriend, ...contactsAsUser];
        } catch (error) {
          console.error("Error getting contacts:", error.message);
            throw error;
        }
      }
      Users.getContactsByName = async function(username, me){
        try {
          const contacts = await this.findAll({
            where: {
                username: {
                    [Op.iLike]: `%${username}%`,
                },
                id:{
                  [Op.not]: me,
                }
            },
            attributes: { exclude: ['password', 'email'] }
            
        });
        const alreadyExists = await this.getContacts(me);

        const filteredList = contacts.filter(contact =>{
          return !alreadyExists.some(existingContact =>{
            return existingContact.id === contact.id && contact.username === existingContact.username;
          })
        })
       
        return filteredList;
        } catch (error) {
          console.error("Error while searching:", error.message);
          throw error;
        }
      }

      Users.deleteContact = async function(user_id, contact_id){
        try {
            const user = await this.findByPk(user_id);
            const contactToRemove = await this.findByPk(contact_id);

            if(!user && !contactToRemove) throw new Error('Información incorrecta')
            
            const removed = await user.removeContact(contactToRemove);
            if(!removed){
              const removed2 = await user.removeContactAsFriend(contactToRemove);
              return removed2
            }
            return removed;
          } catch (error) {
            console.error("Error removing contact:", error.message);
              throw error;
          }
      }

      Users.getNotifications = async function(id){
        try {
          
          const user = await this.findByPk(id);
          if (!user) throw Error('User not found');
          const notif = await user.getReceiver({
            attributes: { exclude: ['password', 'email'] }
          });
          return notif;
        } catch (error) {
          console.error("Error while retrieving data:", error.message);
          throw error;
        }
      }
    return Users;
}