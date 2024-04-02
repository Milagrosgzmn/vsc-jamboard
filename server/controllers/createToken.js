const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_TOKEN;
const timeExp = 3*24*60*60;
const timeExpAnon = 24*60*60;

const createToken = (id, role)=>{
    return jwt.sign(
        {id},
        secret,
        {
        expiresIn:role ==='user' ? timeExp : timeExpAnon,
        }
    );
}

module.exports = createToken;