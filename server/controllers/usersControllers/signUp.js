const {Users} = require('../../DB_connection');
const createToken = require('../createToken');

const signUp = async (req, res)=>{
    const {user} = req.body;
    
    try {
        if (!user.email || !user.password || !user.username)throw Error ('Missing data');

        const createdUser = await Users.signUp(user.email, user.password, user.username);
        const token = createToken(createdUser.id);
        
        return res.status(200).json({createdUser, token});
    } catch (error) {
        console.error(error.message);
        return res.status(400).json(`Error:${error.message}`);
    }
}

module.exports= signUp;