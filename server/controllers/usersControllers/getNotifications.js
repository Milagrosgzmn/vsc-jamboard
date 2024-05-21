const {Users} = require('../../DB_connection')

const getNotifications = async(req, res)=>{
    const {user_id} = req.params;

    try {
        if(!user_id){
            return res.status(400).json({errors:'Missing data'});
        }
        const notifications = await Users.getNotifications(user_id);
        return res.status(200).json(notifications);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors:'No se pudieron recuperar los datos.'});
    }


}

module.exports = getNotifications;