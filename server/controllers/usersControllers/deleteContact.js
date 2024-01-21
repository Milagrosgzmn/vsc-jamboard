const {Users} = require('../../DB_connection');

const deleteContact = async (req,res)=>{
    const [user_id,contact_id] = req.params.user_id.split('_')
    
    try {
        if(!user_id && !contact_id){
            return res.status(400).json({ errors: 'Missing Data' });
        }

        const contacts = await Users.deleteContact(user_id, contact_id);
        return res.status(200).json(contacts);

    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ errors: error.message});
    }
}

module.exports = deleteContact;