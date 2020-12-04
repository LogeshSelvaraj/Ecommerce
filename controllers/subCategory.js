const SubCategory=require("../models/subCategories")
const slugify=require("slugify")

exports.create=(req,res)=>{
    const name=req.body.name
    const parentObjectId=req.body.parentid
    const subcategory=new SubCategory({
        name,
        slug:slugify(name),
        category:parentObjectId
    })
    subcategory.save((err)=>{
        if(!err){
            res.json(subcategory)
        }else{
            res.status(400).send(err.message)
        }
    })
}

exports.update = (req, res) => {
    const name=req.body.name
    const slug=req.params.slug
    const category=req.body.parent
    console.log(name)
    console.log(category)
    
SubCategory.findOneAndUpdate({slug},{name,category,slug:slugify(name)},{new:true},(err,doc)=>{
    if(!err){
        res.json(doc)
    }else{
        res.status(400).send(err.message)
        console.log(err)
    }
})
};

exports.list = (req, res) => {
    SubCategory.find({}).sort("slug").exec((err,docs)=>{
        if(!err){
            res.json(docs)
        }else{
            res.status(400).send(err.message)
        }
    })
};

exports.read = (req, res) => {

    const slug=req.params.slug

    SubCategory.findOne({slug},(err,foundCategory)=>{
        if(!err){
            res.json(foundCategory)
        }else{
            res.status(400).send(err.message)
        }
    })
};

exports.remove = (req, res) => {

    const slug=req.params.slug

    SubCategory.findOneAndRemove({slug},(err,doc)=>{
        if(!err){
            res.json(doc)
        }else{
            res.status(400).send(err.message)
        }
    })

};