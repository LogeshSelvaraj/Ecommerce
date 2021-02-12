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
        ref:"category"
    },category:{
        type:ObjectId,
        require:true,
        ref:"subCategory"
    },subcategory:{
        type:ObjectId,
        require:true
    },images:{
       type:Array
    },rating:{
        star:Number,
        default:0
    },reviews:{
        type:[{
            type:String
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