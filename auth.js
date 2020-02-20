const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET;

//Generate a token to login
function createToken(email) {
    const token = jwt.sign({ email: email }, secret, { expiresIn: '24h' });
    return token;
};


//Ckeck if the user is logged in
function checkToken(token,next) {
    jwt.verify(token, secret, (err, decoded) => {
        
        if (!err) {
            var email = decoded['email'];
            console.log(email);
            next(email);
        }
        else
            return null;
    });
};
module.exports = { createToken, checkToken };