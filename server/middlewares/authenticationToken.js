const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, secret,(err, decodedToken)=>{
            if(err){
                return res.status(400)
            }else{
                next();
            }
        })
    }else{
        return res.status(400);
    }
}

module.exports = requireAuth;