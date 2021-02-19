const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, authAdminCheck } = require("../middlewares/auth");

// controller
const {create,listAll,remove,update,read,flagship,getFlagshipCount,allProducts,allProductsCount,updateRating,relatedProducts} =require("../controllers/product");

// routes
router.post("/product",authCheck,authAdminCheck,create)
router.get("/product/:_id",read)
router.get("/products-newarrivals/:count",listAll)
router.delete("/product/:_id",remove)
router.put("/product",authCheck,authAdminCheck,update)
router.post("/product-flagship",flagship)
router.get("/products-count-flagship",getFlagshipCount)
router.post("/all-products",allProducts)
router.get("/products-count",allProductsCount)
router.post("/product/rating",authCheck,updateRating)
router.get("/product/related/:id",relatedProducts)

module.exports = router;
