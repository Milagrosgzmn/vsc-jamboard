const { Users } = require("../../DB_connection");

const getContactByUserName = async (req, res)=>{
    try {
        const {username, me} = req.query;
        if (!username) {
            return res.status(400).json('Missing data');    
        }

        const contacts = await Users.getContactsByName(username, me);
        return res.status(200).json(contacts);

    } catch (error) {
        console.error(error);
        return res.status(400).json({errors: error.message});
    }
}

module.exports = getContactByUserName;