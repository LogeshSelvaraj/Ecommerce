const mongooose=require("mongoose")
const {Types:{ObjectId}} =mongooose.Schema
const fs=require("fs")

function arrayLimit(val){
    return val.length>5
}

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
        maxlength:250
    },specs:{
        type:[{
            type:String
        }],
        validate:[arrayLimit,"minimum specs required"]
    },price:{
        type:Number,
        require:true
    },category:{
        type:ObjectId,
        require:true
    },subcategory:{
        type:ObjectId,
        require:true
    },images:{
        type:[{
            data:Buffer,
            contentType:String
        }]
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
    }
    
})

modules.export=mongooose.model("product",Product)