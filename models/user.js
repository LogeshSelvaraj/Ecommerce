const mongoose=require("mongoose")
const {Types : {ObjectId}}  =mongoose.Schema

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        index:true
    },
    role:{
        type:String,
        default:"subscriber"
    },
    cart:{
        type:Array,
        default:[]
    },
    address:String
    // ,whislist:[{type:ObjectId,ref:"Product"}],
    },
    {timestamps:true}
    )

    module.exports=new mongoose.model("User",userSchema)
