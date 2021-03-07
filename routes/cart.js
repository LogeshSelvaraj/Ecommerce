const express=require("express")
const router=express.Router()

const {authCheck } = require("../middlewares/auth");
const {getItems,setItems}=require("../controllers/cart")

router.post("/cart",authCheck,getItems)
router.post("/cart/fetch",authCheck,setItems)

module.exports=router