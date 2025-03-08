var jwt = require('jsonwebtoken');
const JWTsec = 'hello';


const fetchuser=(req,res,next)=>{
    //Get the user from jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Pls authenticate using valid token"})
    }
    try {
        const data=jwt.verify(token,JWTsec);
        req.user=data.user; 
        next();
    } catch (error) {
        res.status(401).send({error:"Pls authenticate using valid token"})
    }
}

module.exports = fetchuser;