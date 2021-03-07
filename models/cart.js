const mongoose=require("mongoose")
const {Types:{ObjectId}}=mongoose.Schema

const cart=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    products:{
        type:Array
    }
})

module.exports=mongoose.model("cart",cart)