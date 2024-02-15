const {Users} = require('../../DB_connection');
const createToken = require('../createToken');
const login = async (req, res)=>{

    const timeExp = 3*24*60*60*1000;
    
    const {email, password} = req.body;
    try {
        if(!email || !password)throw Error('Missing data');

        const user = await Users.login(email, password);
        const token = createToken(user.id)

        res.cookie('jwt',token,{httpOnly: true,maxAge:timeExp})
        return res.status(200).json(user)
        
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors: error.message});
    }
}

module.exports= login;