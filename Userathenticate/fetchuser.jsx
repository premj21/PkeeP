var jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); 
dotenv.config({path:'../config.env'});

const jw_sec = process.env.JW_SEC;
    
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(token){
    try {
        const data = jwt.verify(token, jw_sec);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
else { console.log("no token behenchod ")};
}
module.exports = fetchuser;
