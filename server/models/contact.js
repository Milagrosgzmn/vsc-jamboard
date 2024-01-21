

module.exports = (sequelize)=>{
    const  Contacts = sequelize.define('Contacts',{
        
    }
    )  
    Contacts.isAlreadyContact = async (user_id, friend_id) => {
        try {
          const existingContact = await this.findOne({
            where: {
              user_id: user_id,
              friend_id: friend_id
            }
          });
      
          return existingContact !== null;
        } catch (error) {
          console.error("Error checking contact:", error.message);
          throw error;
        }
      };

    return Contacts;
}