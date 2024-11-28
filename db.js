const mongoose = require('mongoose') ;


const Schema = mongoose.Schema ;
const ObjectId = mongoose.Types.ObjectId ;

const userSchema = new Schema({
    email: {type:String , unique:true} ,
    password: String,
    firstName : String,
    lastName : String
})

const adminSchema = new Schema({
    email: {type:String , unique:true} ,
    password: String,
    firstName : String,
    lastName : String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    creatorId: ObjectId,
    imageUrl: String

})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})


const userModel = mongoose.model("user",userSchema) ;
const courseModel = mongoose.model("course",courseSchema) ;
const adminModel = mongoose.model("admin",adminSchema) ;
const purchasesModel = mongoose.model("purchases",purchaseSchema) ;

module.exports = {
    userModel,
    courseModel,
    adminModel,
    purchasesModel
}