const Category=require("../models/category")
const slugify=require("slugify")

exports.create=(req,res)=>{
    console.log("create called")
    const name=req.body.name
    const category=new Category({
        name,
        slug:slugify(name)
    })
    category.save((err)=>{
        if(!err){
            res.json(category)
        }else{
            res.status(400).send(err.message)
        }
    })
}

exports.update = (req, res) => {
    const name=req.body.name
    const slug=req.params.slug
    
Category.findOneAndUpdate({slug},{name,slug:slugify(name)},{new:true},(err,doc)=>{
    if(!err){
        res.json(doc)
    }else{
        res.status(400).send(err.message)
        console.log(err)
    }
})
};

exports.list = (req, res) => {

    Category.find({}).sort("slug").exec((err,docs)=>{
        if(!err){
            res.json(docs)
        }else{
            res.status(400).send(err.message)
        }
    })
};

exports.read = (req, res) => {

    const slug=req.params.slug

    Category.findOne({slug},(err,foundCategory)=>{
        if(!err){
            res.json(foundCategory)
        }else{
            res.status(400).send(err.message)
        }
    })
};

exports.remove = (req, res) => {

    const slug=req.params.slug

    Category.findOneAndRemove({slug},(err,doc)=>{
        if(!err){
            res.json(doc)
        }else{
            res.status(400).send(err.message)
        }
    })

};