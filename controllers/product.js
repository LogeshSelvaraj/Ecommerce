const Product=require("../models/product")
const slugify=require("slugify")

exports.create=(req,res)=>{
    const newProduct=new Product(req.body);
    newProduct.save((err)=>{
        if(!err){
            res.json(newProduct)
        }else{
            res.status(400).send(err.message)
        }
    })
}