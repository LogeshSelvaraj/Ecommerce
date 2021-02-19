const mongooose=require("mongoose")
const {Types:{ObjectId}} =mongooose.Schema



const Product=new mongooose.Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:32
    },
    slug:{
        type:String
    },
    description:{
        type:String,
        required:true,
        minlength:30,
        maxlength:1000
    },specs:{
        type:[{
            name:String,
            detail:String
        }],
    },price:{
        type:Number,
        require:true,
        
    },category:{
        type:ObjectId,
        require:true,
        ref:"category"
    },subcategory:{
        type:ObjectId,
        require:true,
        ref:"subcategory"
    },images:{
       type:Array
    },ratings:{
        type:[{
            star:Number,
            postedBy:{
                type:ObjectId,
                ref:"User"
            }
        }],
    },stock:{
        type:Number
    },sold:{
        type:Number
    },brand:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports=mongooose.model("product",Product)