const express=require("express")
const router=express.Router()

const {authCheck, authAdminCheck } = require("../middlewares/auth");
const {create,read,update,remove,list}=require("../controllers/category")

router.post("/category",authCheck,authAdminCheck,create)
router.put("/category/:slug", authCheck,authAdminCheck, update);
router.get("/category/:slug", authCheck,authAdminCheck, read);
router.delete("/category/:slug", authCheck,authAdminCheck,remove );
router.get("/categories",list);


module.exports = router;
