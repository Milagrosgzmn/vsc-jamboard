const createToken = require('../createToken');
const loginAsAnonymousUser = async (req, res)=>{
    const timeExp = 24*60*60*1000;
    try {
        const user = {
            id: 'anonymous',
            role: 'guest'
        }
        const token = createToken(user.id, user.role);

        res.cookie('jwt',token,{httpOnly: true, maxAge:timeExp})
        return res.status(200).json({success:true});
        
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors: error.message});
    }
}

module.exports= loginAsAnonymousUser;