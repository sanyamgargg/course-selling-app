const {Router} = require('express')
const {userModel, purchasesModel} = require('../db')
const userRouter = Router() ;
const jwt = require('jsonwebtoken') ;
const { userMiddleware } = require('../middlewares/user.middlewares');
const bcrypt = require('bcrypt') ;
require('dotenv').config() ;



userRouter.post("/signup",async (req,res)=>{
    const {email, password, lastName, firstName} = req.body ;
    //TODO: Zod validation
    //TODO:bcrypt and hash the password
    const hashedPassword = bcrypt.hash(password,10) ;

    try {
        await userModel.create({
            email:email,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName
        })
        
        res.status(201).json({
            message:"New Account Created."
        })
    } catch (error) {
        res.json({
            message: "Signup failed."
        })
    }
   
})
userRouter.post("/signin",async(req,res)=>{
    const {email,password} = req.body ;
    //TODO: use brcypt to decrypt password.
  
    const user = await userModel.findOne({
        email:email,
    })

    const checkPassword = bcrypt.compare(password,user.password) ;

    if(checkPassword){
        const token = jwt.sign({
            id: user._id
        },process.env.JWT_USER_PASSWORD)

        res.json({
            message:"Logged in Successfully.",
            token:token
        })
    }else{
        res.status(403).json({
            message:"Invaid credentials."
        }) 
    }
})
userRouter.get("/purchases",userMiddleware,async(req,res)=>{
    const userId = req.userId ;

    const purchasedCourse = await purchasesModel.find({
        userId:userId
    }) ;

    res.json({
        purchasedCourse
    })
})

module.exports = {
    userRouter
}