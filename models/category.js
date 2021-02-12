const mongoose=require("mongoose")

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:"Name is required",
        trim:true,
        minlength:[3,"Too short"],
        maxlength:[16,"Too long"]
    },
    slug:{
        type:String,
        unique:true,
        index:true,
        lowercase:true
    }
},{timestamps:true})

module.exports=mongoose.model("category",CategorySchema)