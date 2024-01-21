const {Contacts} = require('../../DB_connection');

const sendInvitation = async(req, res)=>{
    const {user_id, friend_id} = req.body;

    try {
        if(!user_id || ! friend_id){
            return res.status(400).json({ errors: 'Missing Data' });
        }

        const isAlreadyContact = await Contacts.isAlreadyContact(user_id, friend_id);
        if (isAlreadyContact) {
            return res.status(400).json({error:'Ya existe el contacto'})
        }
        return res.status(200).json({success:true})
        
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors: error.message});
    }
}
module.exports = sendInvitation;