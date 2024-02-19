const {Users} = require('../../DB_connection');

const addContact = async (req, res)=>{

    const {user_id, friend_id} = req.body;

    try {
        if(!user_id || !friend_id)throw new Error('Missing data');

        await Users.addNewContact(user_id, friend_id)

        return res.status(200).json({success:true});
        
    } catch (error) {
        console.error('Controller Error'+ error.message);
        return res.status(400).json({errors: error.message});
    }
}

module.exports =  addContact;