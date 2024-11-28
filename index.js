require('dotenv').config() ;
const express = require('express') ;
const app = express() ;
const {userRouter} = require("./Routes/user.routes") ;
const {courseRouter} = require("./Routes/course.routes")
const {adminRouter} = require("./Routes/admin.routes") ;
const mongoose = require('mongoose');


(async ()=>{
    try {
        await mongoose.connect('mongodb+srv://sanyamgarg:sanyam1828@first-project.vb4nn.mongodb.net/course-selling-app')

        console.log("Connected to mongoose.")
    } catch (error) {
        console.log("Cannot connect to mongo.")
    }
 

})() ;
app.use(express.json()) ;

app.use("/api/v1/user",userRouter) ;
app.use("/api/v1/course",courseRouter) ;
app.use("/api/v1/admin",adminRouter) ;


app.listen(3000,()=>{
    console.log("App is working.")
})