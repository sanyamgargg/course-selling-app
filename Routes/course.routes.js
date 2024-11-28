const {Router} = require('express') ;
const { courseModel, purchasesModel } = require('../db');
const { userMiddleware } = require('../middlewares/user.middlewares');

const courseRouter = Router() ;

courseRouter.get("/preview",async (req,res)=>{
    const allCourses = await courseModel.find({}) ;
    res.json({
        allCourses
    })
})
courseRouter.get("/purchase",userMiddleware,async(req,res)=>{
    const userId = req.userId ;
    const {courseId} = req.body ;

    const purchasedCourse = await purchasesModel.create({
        userId:userId,
        courseId:courseId
    })
    res.json({
        purchasedCourse
    })
})


module.exports = {
    courseRouter
}