const Product=require("../models/product")
const slugify=require("slugify")

exports.create=(req,res)=>{
    const {title,description,price,category,subcategory,brand,stock}=req.body.values
    const {specs,images}=req.body
    
    const newProduct=new Product({
        title,
        slug:slugify(title),
        description,
        price,
        images,
        category,
        subcategory,
        specs,
        brand,
        stock
    });
    newProduct.save((err)=>{
        if(!err){
            res.json(newProduct)
        }else{
            console.log(err.message)
            res.status(400).send(err.message)
        }
    })
}

exports.listAll=(req,res)=>{
    Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subCategory")
    .sort([["createdAt","desc"]])
    .exec((err,docs)=>{
        if(!err){
            res.json(docs)
        }else{
            res.status(400).send("error")
        }
    })
    
}
