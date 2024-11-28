require('dotenv').config() ;
const jwt = require('jsonwebtoken')

function adminMiddleware(req,res,next){
    const token = req.headers.token ;
    const decodedData = jwt.verify(token,process.env.JWT_ADMIN_PASSWORD) ;

    if(decodedData){
        req.adminId = decodedData.id ;
        console.log("admin valid.")
        next() ;
    }else{
        res.status(403).json({
            message : "admin not validated,login again."
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}