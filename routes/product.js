const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, authAdminCheck } = require("../middlewares/auth");

// controller
const {create,listAll} =require("../controllers/product")

// routes
router.post("/product",authCheck,authAdminCheck,create)
router.get("/products/:count",listAll)


module.exports = router;
