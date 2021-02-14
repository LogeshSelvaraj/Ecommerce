const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, authAdminCheck } = require("../middlewares/auth");

// controller
const {create,listAll,remove,update,read} =require("../controllers/product");

// routes
router.post("/product",authCheck,authAdminCheck,create)
router.get("/product/:_id",read)
router.get("/products-newarrivals/:count",listAll)
router.delete("/product/:_id",remove)
router.put("/product",authCheck,authAdminCheck,update)


module.exports = router;
