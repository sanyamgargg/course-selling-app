require('dotenv').config() ;
const jwt = require('jsonwebtoken')

function userMiddleware(req,res,next){
    const token = req.headers.token ;
    const decodedData = jwt.verify(token,process.env.JWT_USER_PASSWORD) ;

    if(decodedData){
        req.userId = decodedData.id ;
        console.log("user Validated.")
        next() ;
    }else{
        res.status(403).json({
            message : "User not validated,login again."
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}