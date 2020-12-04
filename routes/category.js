const express=require("express")
const router=express.Router()

const { authAdminCheck } = require("../middlewares/auth");
const {create,read,update,remove,list}=require("../controllers/category")

router.post("/category",authAdminCheck,create)
router.put("/category", authAdminCheck, update);
router.get("/category", authAdminCheck, read);
router.delete("/category", authAdminCheck,remove );
router.get("/categories",list);


module.exports = router;
