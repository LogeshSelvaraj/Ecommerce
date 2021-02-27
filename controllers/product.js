const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const specsValidation = (specs) => {
  let newSpecs = [];
  specs.map((s) => {
    s.name && s.detail && newSpecs.push(s);
  });
  return newSpecs;
};

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
    specs: specsValidation(specs),
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

exports.flagship = (req, res) => {
  let page = req.body.page;
  Product.find({ category: "60262252568e5342347450b9", price: { $gte: 30000 } }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).send(err.message);
    }
  })
    .limit(4)
    .skip((page - 1) * 4);
};

exports.getFlagshipCount = async (req, res) => {
  Product.countDocuments({ price: { $gte: 30000 } }, (err, count) => {
    if (!err) {
      res.json(count);
    } else {
      res.send(err.message);
    }
  });
};

exports.allProductsCount = async (req, res) => {
  Product.countDocuments({}, (err, count) => {
    if (!err) {
      res.json(count);
    } else {
      res.send(err.message);
    }
  });
};

exports.allProducts = async (req, res) => {
  let page = req.body.page;
  let products = await Product.find({})
    .limit(4)
    .skip((page - 1) * 4)
    .sort([["createdAt", 1]]);
  if (products) {
    res.json(products);
  } else {
    res.status(400).send("Error");
  }
};

exports.remove = (req, res) => {
  console.log(req.params._id);
  Product.findByIdAndDelete(req.params._id, (err, docs) => {
    if (!err) {
      docs.images.map((img) => {
        cloudinary.uploader.destroy(img.public_id);
      });
      res.send(docs.title);
    } else {
      res.status(400).send("error in removing");
    }
  });
};

exports.update = async (req, res) => {
  const { title, description, price, category, subcategory, brand, stock, _id } = req.body.values;
  const { specs, images } = req.body;

  const newProduct = {
    title,
    slug: slugify(title),
    description,
    price,
    images,
    category,
    subcategory,
    specs: specsValidation(specs),
    brand,
    stock,
  };

  console.log(category, subcategory);

  let docs = await Product.findOneAndUpdate({ _id }, newProduct, { new: true });

  if (docs) {
    res.json(docs);
  } else {
    res.status(400).send("error");
  }
};

exports.read = (req, res) => {
  const _id = req.params._id;
  Product.find({ _id }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(400).send(err.message);
    }
  });
};

exports.updateRating = async (req, res) => {
  const { productId, star } = req.body;
  const product = await Product.findById(productId).exec();
  console.log(req.user.email)
  const user = await User.findOne({ email: req.user.email }).exec();

  const existingRating = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  if (existingRating) {
    const updatedRating = await Product.updateOne(
      { ratings: { $elemMatch: existingRating } },
      { $set: { "ratings.$.star": star } },
      { new: true }
    );
    console.log(updatedRating);
    res.json(updatedRating);
  } else {
    const newRating = await Product.findByIdAndUpdate(
      productId,
      { $push: { ratings: { star, postedBy: user._id } } },
      { new: true }
    );
    console.log(newRating);
    res.json(newRating);
  }
};

exports.relatedProducts=async(req,res)=>{

  const productId=req.params.id

  const product=await Product.findById(productId).exec()

   const  lowRange=parseInt(product.price-10000)
   const  highRange=parseInt(product.price+10000)

  const product1=await Product.find({_id:{$ne:
    productId
  } ,
  price:{$gte:lowRange,$lte:highRange}
}
  ).limit(2)
  let product2=[];
  if(product1[0]&&product1[1]){
     product2=await Product.find( {
       _id:{$nin:[
      product._id,
      product1[0]._id,
      product1[1]._id
    ]},
    subcategory:product.subcategory}).limit(2)
  }else if(product1[0]){
    product2=await Product.find({
      _id:{$nin:[
      product._id,
      product1[0]._id,
    ]},
    subcategory:product.subcategory}).limit(2)
  }else{
    product2=await Product.find({_id:{$nin:[
      product._id,
    ]},subcategory:product.subcategory}).limit(2)
  }

  let related=[];
 product1.length&& product1.map(e=>related.push(e))
  product2.length&& product2.map(e=>related.push(e))

res.json(related)

}

exports.prdouctsOnCategory=async(req,res)=>{
  const {type,id}=req.body
  if(type==="category"){
    Product.find({category:id},(err,docs)=>{
      if(!err){
        res.json(docs)
      }else{
        res.status(400).send(err.message)
      }
    })
  }else{
    Product.find({subcategory:id},(err,docs)=>{
      if(!err){
        res.json(docs)
      }else{
        res.status(400).send(err.message)
      }
    })
  }
}
