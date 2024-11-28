const {Router} = require('express') ;
const adminRouter = Router() ;
const {adminModel, courseModel} = require('../db') ;
require('dotenv').config() ;
const {adminMiddleware} = require("../middlewares/admin.middlewares") ;
const jwt = require('jsonwebtoken') ;

adminRouter.post("/signup",async(req,res)=>{
    const {email, password, lastName, firstName} = req.body ;
    //TODO: Zod validation
    const hashedPassword = bcrypt.hash(password,10) ;

    try {
        await adminModel.create({
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

adminRouter.post("/signin",async(req,res)=>{
    const {email,password} = req.body ;
    //TODO: use brcypt to decrypt password.

    const admin = await adminModel.findOne({
        email:email,
    })

    const checkPassword = bcrypt.compare(password,admin.password) ;
    if(checkPassword){
        const token = jwt.sign({
            id: admin._id 
        },process.env.JWT_ADMIN_PASSWORD)

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

adminRouter.post("/course",adminMiddleware,async(req,res)=>{
    const adminId = req.adminId ;
    const {title,description,price,imageUrl} = req.body ;

    try {
        const course = await courseModel.create({
            title,description,imageUrl,price, creatorId:adminId
        })
        res.json({
            message:"New Course Created.",
            courseId : course._id
        })
    } catch (error) {
        res.status(403).json({
            message:"Cannot create new course.",
            error:error
        })
    }
})

adminRouter.put("/course",async(req,res)=>{
    const adminId = req.adminId ;
    const {title,description,price,imageUrl,courseId} = req.body ;

    try {
        const course = await courseModel.updateOne({
            _id:courseId,
            creatorId:adminId
        },{
            title,description,imageUrl,price, creatorId:adminId
        })
        res.json({
            message:"Course Updated.",
            courseId : course._id
        })
    } catch (error) {
        res.status(403).json({
            message:"Cannot update the course.",
            error:error
        })
    }
})

adminRouter.get("/course/bulk",adminMiddleware,async(req,res)=>{
    const adminId = req.adminId ;

    const allCourses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        allCourses
    })
})

module.exports = {
    adminRouter
}