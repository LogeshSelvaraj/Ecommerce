const express=require("express")
const router=express.Router()

const {authCheck,authAdminCheck}=require("../middlewares/auth")

// controllers
const {upload,remove}=require("../controllers/cloudinary")


router.post("/product-image",authCheck,authAdminCheck,upload)
router.post("/product-image-remove",authCheck,authAdminCheck,remove)

module.exports=router