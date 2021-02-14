const Product = require("../models/product");
const slugify = require("slugify");
const cloudinary=require("cloudinary")

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const specsValidation=(specs)=>{
  let newSpecs=[];
  specs.map(s=>{
    s.name&&s.detail&&newSpecs.push(s)
  })
  return newSpecs
}



exports.create = (req, res) => {
  const { title, description, price, category, subcategory, brand, stock } = req.body.values;
  const { specs, images } = req.body;

  const newProduct = new Product({
    title,
    slug: slugify(title),
    description,
    price,
    images,
    category,
    subcategory,
    specs:specsValidation(specs),
    brand,
    stock,
  });
  newProduct.save((err) => {
    if (!err) {
      res.json(newProduct);
    } else {
      console.log(err.message);
      res.status(400).send(err.message);
    }
  });
};

exports.listAll = (req, res) => {
  Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subcategory")
    .sort([["createdAt", "desc"]])
    .exec((err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(400).send("error");
      }
    });
};

exports.remove = (req, res) => {
  console.log(req.params._id);
  Product.findByIdAndDelete(req.params._id, (err, docs) => {
    if (!err) {
      docs.images.map((img) => {
        cloudinary.uploader.destroy(img.public_id);
      });
      res.send(docs.title)
    }else{
        res.status(400).send("error in removing")
    }
  });
};

exports.update=async(req,res)=>{
  const { title, description, price, category, subcategory, brand, stock ,_id} = req.body.values;
  const { specs, images } = req.body;

  const newProduct= {
    title,
    slug: slugify(title),
    description,
    price,
    images,
    category,
    subcategory,
    specs:specsValidation(specs),
    brand,
    stock,
  }

  console.log(category,subcategory)

 let docs=await Product.findOneAndUpdate({_id},newProduct,{new:true})

 if(docs){
   res.json(docs)
 }else{
    res.status(400).send("error")
 }

}

exports.read=(req,res)=>{
  const _id=req.params._id
  Product.find({_id},(err,docs)=>{
    if(!err){
      res.json(docs)
    }else{
      res.status(400).send(err.message)
    }
  })
  
}
