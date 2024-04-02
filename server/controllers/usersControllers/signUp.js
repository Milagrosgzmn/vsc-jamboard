const {Users} = require('../../DB_connection');
const createToken = require('../createToken');

const timeExp = 3*24*60*60;
const signUp = async (req, res)=>{
    const {user} = req.body;
    try {
        if (!user.email || !user.password || !user.username)throw Error ('Verifica todos los campos');

        const createdUser = await Users.signUp(user.email, user.password, user.username);
        const token = createToken(createdUser.id, 'user');

        res.cookie('jwt',token,{httpOnly: true,maxAge:timeExp*1000})
        
        return res.status(200).json(createdUser);

    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors: error.message});
    }
}

module.exports= signUp;