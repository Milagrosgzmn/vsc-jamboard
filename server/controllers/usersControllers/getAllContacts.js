const Users = require('../../DB_connection')

const getAllContacts = async(req, res)=>{
    const {user_id} = req.params;

    try {
        if(!user_id){
            return res.status(400).json({errors:'Missing data'});
        }

        const contacts = await Users.getContacts(user_id);

        return res.status(200).json(contacts);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors:'No se pudieron recuperar los contactos.'});
    }


}

module.exports = getAllContacts;