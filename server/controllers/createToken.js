const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_TOKEN;
const timeExp = 3*24*60*60;

const createToken = (id)=>{
    return jwt.sign(
        {id},
        secret,
        {
        expiresIn:timeExp,
        }
    );
}

module.exports = createToken;